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
  - GET /orders - view all orders
  - POST /orders/:id/accept - accept order, set estimate time and send text msg
  - POST /orders/:id/complete - send completion time, text msg, no longer show on /orders

  ##### CLIENT ROUTES
  - GET /login/:id -login as a current user (or admin), returns main page with menu, returns a lists of all items

  menu:
  - GET /:itemid - view details of item
  - POST /:itemid - add item & quantity to shopping cart 

  cart:
  - GET /cart/:id - shopping cart
  - DELETE /cart/:id/delete - delete item from shopping cart
  - POST /cart/:id - checkout

##### WORKFLOW
1. When user logs in - select * from orders where type='cart' and user_id = $userId. Set up cookie session
   If result empty (no cart) - create new order with type='cart'

2. When click "add to order": 1) select cart for this user; 2) add new item to this cart (POST /:itemid)
3. When "Create order" : update orders: type=order, additional fields where id=cartId. 
  TODO: HOW TO GET AN ORDER ID??? to view an order (when checkout)

#### WIREFRAMES


