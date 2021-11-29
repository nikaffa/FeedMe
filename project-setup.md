#### USER STORIES
  - As a user, I can browse the menu and add items to my order. Because I like to order online rather than in person
  - As a user I can receive notifications when my order is accepted. 
  - As a restaurant owner, I can accept orders online because that increases convenience for me
  - As a restaurant I can receive orders online Because that will generate more business
  - As a user I can receive notifications when my order is ready so that I'm aware of the status

#### TABLES
  - users 
  - orders
  - items (menu)
  - order_items (shopping cart)

#### ADMIN ROUTES

  - GET /login -get to login page
  - POST /login -login
  - GET /orders -view all orders
  - POST /orders/:id/accept - accept order set estimate time and send text
  - POST /orders/:id/complete - sends completion text no longer show on /orders


  ##### CLIENT ROUTES
  
  - POST /:itemid -add items
  - GET /:itemid - view details of item
  - GET  / -main page with menu
  - GET /orders/:id - shopping cart
  - POST /orders/:id - checkout
  - POST /orders/:id/edit - add/delete items

#### WIREFRAMES


