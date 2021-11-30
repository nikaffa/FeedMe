ALTER TABLE orders
ALTER column completed (true)
WHERE order_id = $1

