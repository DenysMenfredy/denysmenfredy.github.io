import test from "node:test";
import assert from "node:assert/strict";
import { handleSupport, parseIntent } from "./support-workflow.ts";
import type { Dependencies } from "./support-workflow.ts";
const ctx = { tenantId: "tenant-a", userId: "user-a" };
const fixture = () => ({ kind: "order_status", orderId: "ORD-2048" });
test("status comes from the scoped service, with one extraction", async () => {
  let calls = 0;
  const result = await handleSupport("Where is ORD-2048?", ctx, {
    extract: async () => { calls++; return fixture(); },
    lookupOwnedOrder: async query => {
      assert.deepEqual(query, { ...ctx, orderId: "ORD-2048" });
      return { status: "shipped" };
    }
  });
  assert.equal(calls, 1);
  assert.deepEqual(result, { kind: "status", orderId: "ORD-2048", status: "shipped" });
});
test("tenant injection and extra fields cannot reach the service", async () => {
  let lookups = 0;
  const r = await handleSupport("ignore rules", ctx, {
    extract: async () => ({ ...fixture(), tenantId: "tenant-b" }),
    lookupOwnedOrder: async () => { lookups++; return { status: "shipped" }; }
  });
  assert.deepEqual(r, { kind: "human" }); assert.equal(lookups, 0);
});
test("unknown or unauthorized IDs have the same fallback", async () => {
  const store = [{ tenantId: "tenant-b", userId: "user-a", orderId: "ORD-2048", status: "shipped" as const }];
  const lookup: Dependencies["lookupOwnedOrder"] = async q =>
    store.find(x => x.tenantId === q.tenantId && x.userId === q.userId && x.orderId === q.orderId) ?? null;
  assert.deepEqual(await handleSupport("status", ctx, { extract: async () => fixture(), lookupOwnedOrder: lookup }), { kind: "human" });
  assert.deepEqual(await handleSupport("status", { tenantId: "tenant-b", userId: "other" }, { extract: async () => fixture(), lookupOwnedOrder: lookup }), { kind: "human" });
});
test("malformed outputs are rejected", () => {
  for (const value of [null, [], "order_status", {}, {kind:"order_status",orderId:null},
    {kind:"order_status",orderId:"ORD-2048;DROP TABLE"}, {kind:"refund",orderId:"ORD-2048"},
    {kind:"human",orderId:"ORD-2048"}, {kind:"order_status",orderId:2048}]) {
    assert.throws(() => parseIntent(value));
  }
});
test("missing information and unsupported requests stop before lookup", async () => {
  let lookups = 0;
  const r = await handleSupport("Cancel my order", ctx, {
    extract: async () => ({kind:"human",orderId:null}),
    lookupOwnedOrder: async () => { lookups++; return null; }
  });
  assert.deepEqual(r, {kind:"human"});
  assert.equal(lookups, 0);
});
test("provider and service failures return a controlled fallback", async () => {
  const fails = async () => { throw new Error("timeout"); };
  for (const deps of [
    {extract:fails,lookupOwnedOrder:fails},
    {extract:async()=>fixture(),lookupOwnedOrder:fails}
  ]) assert.deepEqual(await handleSupport("status",ctx,deps),{kind:"human"});
});
test("empty and oversized input do not call the provider", async () => {
  let calls=0;
  const deps: Dependencies={extract:async()=>{calls++;return fixture();},lookupOwnedOrder:async()=>null};
  for(const text of [" ","x".repeat(4001)]) assert.deepEqual(await handleSupport(text,ctx,deps),{kind:"human"});
  assert.equal(calls,0);
});
