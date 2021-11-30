ALTER TABLE orders
ALTER column accepted_at (TIMESTAMP)
WHERE order_id = $1

