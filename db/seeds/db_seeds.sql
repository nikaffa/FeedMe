
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
(5, 'Lionel', '604-539-8552'),
(6, 'Stasy Choo', '604-500-8552'),
(7, 'Margarita', '604-522-8522');

SELECT setval('users_id_seq', (SELECT MAX(id) FROM users)+1);

INSERT INTO items(id, type, name, description, price, image)
VALUES
(1, 'Bowls', 'Harvest Bowl', 'Roasted chicken, roasted sweet potatoes, apples, goat cheese, roasted almonds, warm wild rice, shredded kale, balsamic vinaigrette', 1650, 'https://images.ctfassets.net/eum7w7yri3zr/Br3EYlf6srQYhCXdvOfwt/19e0fdce4fdd9df8794e5408e10178aa/Product_Carousel-Harvest_Bowl.jpg?w=600&q=75'),
(2, 'Bowls', 'Crispy Rice Bowl', 'Blackened chicken, raw carrots, shredded cabbage, cucumbers, cilantro, roasted almonds, crispy rice, warm wild rice, arugula, lime squeeze, spicy cashew dressing', 1550, 'https://images.ctfassets.net/eum7w7yri3zr/77bQryCjkOcr4lAKYIpo1C/1dfb2940f182fa5d3bbfa868316654a8/menu_warm_bowls_crispy_rice_bowl.jpg?w=600&q=75'),
(3, 'Bowls', 'Fish Taco', 'Roasted steelhead, avocado, shredded cabbage, cilantro, tortilla chips, warm quinoa, arugula, sweetgreen hot sauce, lime cilantro jalapeño vinaigrette', 1350, 'https://images.ctfassets.net/eum7w7yri3zr/GfXc33iGipBc9eYJM7bAP/332efb928a268e85cc94b5c9f4a5a5ec/menu_warm_bowls_fish_taco.jpg?w=600&q=75'),
(4, 'Bowls', 'Chicken Pesto Parm', 'Roasted chicken, spicy broccoli, tomatoes, shaved parmesan, za’atar breadcrumbs, warm quinoa, baby spinach, sweetgreen hot sauce, pesto vinaigrette (contains gluten)', 1500, 'https://images.ctfassets.net/eum7w7yri3zr/5Kw3escovLNb8uWqQuzR7o/61f702ca4b989ace00c09db31f55e700/menu_warm_bowls_chicken_pesto_parm.jpg?w=600&q=75'),
(5, 'Bowls', 'Curry Califlower', 'Roasted chicken, curry roasted cauliflower, shredded cabbage, cilantro, raisins, warm quinoa, arugula, sweetgreen hot sauce, peppercorn tahina dressing', 1300, 'https://images.ctfassets.net/eum7w7yri3zr/6YJYk6s40RvODINLIXl1TP/4dc3247e3b580a5616dfe6fb10361e2f/menu_warmbowls-currycauliflower.jpg?w=600&q=75'),
(6, 'Bowls', 'Shroomami', 'Roasted sesame tofu, warm portobello mix, raw beets, cucumbers, basil, spicy sunflower seeds, warm wild rice, shredded kale, miso sesame ginger dressing (vegan)', 1400, 'https://images.ctfassets.net/eum7w7yri3zr/5nsFvMyvUZwedpyR4gkDj5/ba2bef42d410967852a52f16c07224aa/Product_Carousel-Shroomami.jpg?w=600&q=75'),
(7, 'Salads', 'Kale Caesar', 'Roasted chicken, tomatoes, parmesan crisps, shaved parmesan, shredded kale, chopped romaine, lime squeeze, caesar dressing', 1300, 'https://images.ctfassets.net/eum7w7yri3zr/5418ra5b4TcMHRxOIobxUx/f2856061ea0d30caf9df0eb42136428c/Product_Carousel-Kale_Caesar.jpg?w=600&q=75'),
(8, 'Salads', 'Guacamole Greens', 'Roasted chicken, avocado, tomatoes, red onions, shredded cabbage, tortilla chips, spring mix, chopped romaine, lime squeeze, lime cilantro jalapeño vinaigrette', 1200, 'https://images.ctfassets.net/eum7w7yri3zr/3Z3fW9JhznhFDphzlHNmRx/85e7f5e3a7e92d63e5fec70e0336b899/Product_Carousel-Guacamole_Greens.jpg?w=600&q=75'),
(9, 'Salads', 'Veggie Caesar', 'Roasted sweet potatoes, spicy broccoli, tomatoes, raw beets, shaved parmesan, parmesan crisps, shredded kale, chopped romaine, lime squeeze, caesar dressing', 1100, 'https://images.ctfassets.net/eum7w7yri3zr/6REEmaoFtk4DEmfSvvVKT/f6d49af01e2ee637bcac4ff5b91fc890/menu_salads_veggie_caesar.jpg?w=600&q=75'),
(10, 'Drinks', 'Hibiscus Clover Tea', 'Refreshing crimson clover tea brightened with tangy hibiscus', 2000, 'https://images.ctfassets.net/eum7w7yri3zr/j28IU9sScvgvuvnQ5AkBj/8f2d3dadaea2baf2810bf5ad1cb90215/menu_spindrift_hibiscus_berry_clover_front_digital_evergreen.jpg?w=600&q=75'),
(11, 'Drinks', 'Jasmine Green Tea', 'Antioxidant rich, with organic soba and wild grown yaupon', 2000, 'https://images.ctfassets.net/eum7w7yri3zr/2jHOZmyz32YglnVD4E0Cgv/94f7aaf703675ae8c532111412958cc0/menu_jasmine_green_tea_front_digital_evergreen.jpg?w=600&q=75'),
(12, 'Drinks', 'Kombucha Apple', 'Effervescent probiotic tea brewed with a hint of apple cider', 3500, 'https://images.ctfassets.net/eum7w7yri3zr/6GI214xbY5YdQewcY23bWG/53db0deaef6d249ce4ce553e0aaa5773/menu_health-ade_kombucha_pink_lady_apple_front_digital_evergreen.jpg?w=600&q=75');

SELECT setval('items_id_seq', (SELECT MAX(id) FROM items)+1);

INSERT INTO orders(id, user_id, type)
VALUES
(1, 2, 'cart'),
(2, 3, 'cart'),
(3, 4, 'cart');

INSERT INTO orders(id, user_id, special_instructions, type)
VALUES
(4, 5, 'No oinions please', 'order'),
(5, 6, 'More oinions!', 'order');

INSERT INTO order_items(id, item_id, order_id, quantity)
VALUES
(1, 1, 1, 1),
(2, 2, 1, 2),
(3, 3, 4, 1),
(4, 4, 5, 10);

INSERT INTO orders(id, user_id, type, accepted_at, completion_time)
VALUES
(6, 7, 'order', Now(), 40),
(7, 7, 'order', Now(), 20);

INSERT INTO order_items(id, item_id, order_id, quantity)
VALUES
(5, 6, 6, 1),
(6, 7, 6, 2),
(7, 8, 7, 1),
(8, 9, 7, 100);

SELECT setval('orders_id_seq', (SELECT MAX(id) FROM orders)+1);
SELECT setval('order_items_id_seq', (SELECT MAX(id) FROM order_items)+1);

