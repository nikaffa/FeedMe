INSERT INTO orders(user_id, special_instructions)
VALUES($1, $2)
RETURNING *;

