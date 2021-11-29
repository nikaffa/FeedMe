-- Users table seeds here (Example)
-- Widgets table seeds here (Example)
INSERT INTO users(id, name, phone, admin)
VALUES
(1, 'Administrator', '778-349-3299', 'admin@greens.ca');

INSERT INTO users(id, name, phone)
VALUES
(2, 'Stephanie', '778-125-2216'),
(3, 'Stan Lee', '778-848-9923'),
(4, 'Lloyd', '604-094-6464'),
(5, 'Lionel', '604-539-8552');

INSERT INTO items(id, type, name, description, price, image)
VALUES
(1, 'Bowls', 'Harwest Bowl', 'Roasted chicken, roasted sweet potatoes, apples, goat cheese, roasted almonds, warm wild rice, shredded kale, balsamic vinaigrette', 1650, '../docs/menu/01.jpeg'),
(2, 'Bowls', 'Crispy Rice Bowl', 'Blackened chicken, raw carrots, shredded cabbage, cucumbers, cilantro, roasted almonds, crispy rice, warm wild rice, arugula, lime squeeze, spicy cashew dressing', 1550, '../docs/menu/02.jpeg'),
(3, 'Bowls', 'Fish Taco', 'Roasted steelhead, avocado, shredded cabbage, cilantro, tortilla chips, warm quinoa, arugula, sweetgreen hot sauce, lime cilantro jalapeño vinaigrette', 1350, '../docs/menu/03.jpeg'),
(4, 'Salads', 'Kale Caesar', 'Roasted chicken, tomatoes, parmesan crisps, shaved parmesan, shredded kale, chopped romaine, lime squeeze, caesar dressing', 1300, '../docs/menu/04.jpeg'),
(5, 'Salads', 'Guacamole Greens', 'Roasted chicken, avocado, tomatoes, red onions, shredded cabbage, tortilla chips, spring mix, chopped romaine, lime squeeze, lime cilantro jalapeño vinaigrette', 1200, '../docs/menu/05.jpeg'),
(6, 'Drinks', 'Hibiscus Clover Tea', 'Refreshing crimson clover tea brightened with tangy hibiscus', 2000, '../docs/menu/06.jpeg'),
(7, 'Drinks', 'JasmIne Green Tea', 'Antioxidant rich, with organic soba and wild grown yaupon', 2000, '../docs/menu/07.jpeg'),
(8, 'Drinks', 'Kombucha Apple', 'Effervescent probiotic tea brewed with a hint of apple cider', 3500, '../docs/menu/08.jpeg');

INSERT INTO order_items(id, order_id, item_id, quantity)
VALUES
(1, 1, 1, 1),
(2, 2, 2, 1),
(3, 3, 5, 2),
(4, 3, 8, 1),
(5, 4, 1, 2),
(6, 4, 5, 1),
(7, 5, 3, 1),
(8, 5, 6, 1);

INSERT INTO orders(id, user_id, accepted_at, special_instructions, completed)
VALUES
(1, 2, '2021-11-27 18:38:40', 'No onions please', true),
(2, 3, '2021-11-27 18:39:40', null, true),
(3, 4, '2021-11-27 20:39:40', 'More onions!', true),
(4, 5, '2021-11-28 18:45:40', 'Two forks please', true);

