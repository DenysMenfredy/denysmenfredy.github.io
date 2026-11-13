export type AuthContext = { tenantId: string; userId: string };
export type Intent = {
  kind: "order_status" | "human";
  orderId: string | null;
};
export type OrderStatus = "processing" | "shipped" | "delivered";
export type Dependencies = {
  // Adapter performs ONE structured extraction request, with its own deadline.
  extract: (text: string) => Promise<unknown>;
  // MUST enforce all three predicates in the database, never fetch-then-filter.
  lookupOwnedOrder: (query: AuthContext & { orderId: string }) =>
    Promise<{ status: OrderStatus } | null>;
};
export type Result =
  | { kind: "status"; orderId: string; status: OrderStatus }
  | { kind: "human" };

export function parseIntent(value: unknown): Intent {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Expected an object");
  }
  const v = value as Record<string, unknown>;
  const keys = Object.keys(v);
  if (keys.length !== 2 || !keys.includes("kind") || !keys.includes("orderId")) {
    throw new Error("Unexpected fields");
  }
  if (v.kind === "human" && v.orderId === null) {
    return { kind: "human", orderId: null };
  }
  if (v.kind === "order_status" && typeof v.orderId === "string"
      && /^ORD-[0-9]{4,12}$/.test(v.orderId)) {
    return { kind: "order_status", orderId: v.orderId };
  }
  throw new Error("Invalid intent");
}

export async function handleSupport(
  text: string, ctx: AuthContext, deps: Dependencies
): Promise<Result> {
  if (text.trim().length === 0 || text.length > 4_000) return { kind: "human" };
  let intent: Intent;
  try {
    intent = parseIntent(await deps.extract(text));
  } catch {
    return { kind: "human" };
  }
  if (intent.kind !== "order_status" || intent.orderId === null) {
    return { kind: "human" };
  }
  try {
    const order = await deps.lookupOwnedOrder({ ...ctx, orderId: intent.orderId });
    if (!order) return { kind: "human" };
    return { kind: "status", orderId: intent.orderId, status: order.status };
  } catch {
    return { kind: "human" };
  }
}
