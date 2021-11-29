-- Users table seeds here (Example)
INSERT INTO users(id, name, phone, admin, order_id)
VALUES (1, 'Administrator', '778-349-3299', 'admin@greens.ca', null),
(2, 'Stephanie', '778-125-2216', null),
(3, 'Stan', '778-848-9923', null),
(4, 'Lloyd', '604-094-6464', null),
(5, 'Lionel', '604-539-8552', null);

INSERT INTO items(id, name, description, price, image)
VALUES (1, 'Harwest Bowl', 'Roasted chicken, roasted sweet potatoes, apples, goat cheese, roasted almonds, warm wild rice, shredded kale, balsamic vinaigrette', 1650, '../docs/menu/01.jpeg'),
(2, 'Crispy Rice Bowl', 'Blackened chicken, raw carrots, shredded cabbage, cucumbers, cilantro, roasted almonds, crispy rice, warm wild rice, arugula, lime squeeze, spicy cashew dressing', 1550, '../docs/menu/02.jpeg'),
(3, 'Fish Taco', 'Roasted steelhead, avocado, shredded cabbage, cilantro, tortilla chips, warm quinoa, arugula, sweetgreen hot sauce, lime cilantro jalapeño vinaigrette', 1350, '../docs/menu/03.jpeg'),
(4, 'Kale Caesar', 'Roasted chicken, tomatoes, parmesan crisps, shaved parmesan, shredded kale, chopped romaine, lime squeeze, caesar dressing', 1300, '../docs/menu/04.jpeg'),
(5, 'Guacamole Greens', 'Roasted chicken, avocado, tomatoes, red onions, shredded cabbage, tortilla chips, spring mix, chopped romaine, lime squeeze, lime cilantro jalapeño vinaigrette', 1200, '../docs/menu/05.jpeg');

INSERT INTO order_items(id, user_id, item_id, quantity)
VALUES (1, 2, 1, 1),
(2, 3, 2, 1),
(3, 3, 5, 2),
(4, 4, 2, 1),
(5, 4, 1, 2),
(6, 4, 5, 1),
(7, 5, 1, 3),

INSERT INTO orders(id, user_id, order_items_id, created_at, accepted_at, completed_at, special_instructions)
VALUES (1, 2, 1, '2021-11-27 18:38:40', '2021-11-27 18:38:40', '2021-11-27 18:38:40', 'No onions please'),
(2, 3, 2, '2021-11-27 18:39:40', '2021-11-27 18:39:40', '2021-11-27 18:39:40', null),
(3, 3, 3, '2021-11-27 18:39:40', '2021-11-27 18:39:40', '2021-11-27 18:39:40', null),
(4, 4, 4, '2021-11-27 18:45:40', '2021-11-27 18:45:40', '2021-11-27 18:45:40', 'Two forks please'),
(5, 4, 5, '2021-11-27 19:38:40', '2021-11-27 19:38:40', '2021-11-27 19:38:40', null),
(6, 4, 6, '2021-11-27 20:38:40', '2021-11-27 20:38:40', '2021-11-27 20:38:40', 'More onions!'),
(7, 5, 7, '2021-11-27 20:38:40', '2021-11-27 20:38:40', '2021-11-27 20:38:40', 'More onions!');


