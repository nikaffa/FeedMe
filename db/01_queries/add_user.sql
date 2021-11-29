INSERT INTO users(name, phone)
VALUES($1, $2)
RETURNING *;
