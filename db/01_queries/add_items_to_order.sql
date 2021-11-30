--when clicking ADD TO ORDER--
--add user--
INSERT INTO users(name, phone)
VALUES(null, null)
RETURNING *;

--add order--
INSERT INTO orders(user_id)
VALUES
($1)
RETURNING *;

--populate cart--
INSERT INTO order_items(order_id, item_id, quantity)
VALUES($1, $2, $3)
RETURNING *;
