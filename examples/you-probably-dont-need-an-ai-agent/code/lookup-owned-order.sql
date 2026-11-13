-- PostgreSQL adapter contract. Bind parameters with your database driver.
-- $1 tenantId and $2 userId come from verified server identity and membership.
SELECT status
FROM orders
WHERE tenant_id = $1 AND customer_id = $2 AND id = $3
LIMIT 1;
