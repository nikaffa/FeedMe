INSERT INTO orders(user_id, special_instructions)
VALUES($1, &2)
RETURNING *;

INSERT INTO order_items(order_id, item_id, quantity)
VALUES($1, $2, $3)
RETURNING *;
