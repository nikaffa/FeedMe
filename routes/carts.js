/*
 * All routes for Carts are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
//--------------------------READY------------------------------------
module.exports = (db) => {
  router.get("/", (req, res) => {
    if (!req.cookies.user_id) {
      res.send("You are admin");
    }
    const user = req.cookies.user_id;
    const userId = req.cookies.user_id;
    console.log('userId ', userId);
    const query = `
    SELECT id FROM orders
    WHERE user_id = $1 AND type='cart'
    `;
    db.query(query, [userId])
      .then(data => {
        console.log('data: ', data);
        const query = `
        SELECT orders.id as orderId, items.name, quantity, price, special_instructions, order_items.id as order_item_id FROM items
        JOIN order_items ON items.id = item_id
        JOIN orders ON orders.id = order_id
        WHERE orders.id = $1 AND orders.type='cart'
        GROUP BY orders.id, items.name, order_item_id, quantity, price
        `;
        db.query(query, [data.rows[0].id])
          .then((d) => {
            let subtotal = 0;
            for (i = 0; i < d.rows.length; i++) {
              subtotal += (d.rows[i].price * d.rows[i].quantity) / 100;
            }
            res.render('cart', { orderItems: d.rows, user, subtotal });
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  //--------------------------IN PROGRESS!!!------------------------------------

  router.post("/", (req, res) => {
    if (!req.cookies.user_id) {
      res.send("Log in as a user first!");
    }
    const itemId = req.body.item_id;
    const quantity = req.body.quantity;
    const userId = req.cookies.user_id;

    // 1. get current user's cart
    const query = `
    SELECT id FROM orders
    WHERE user_id = $1 AND type='cart'
    `;
    db.query(query, [userId])
      .then(data => {
        const cartId = data.rows[0].id;
        console.log('cart id', cartId);
        // 2. Add new item
        const query = `INSERT INTO order_items(order_id, item_id, quantity)
        VALUES($1, $2, $3)
        RETURNING *;`;
        console.log(query + ", " + cartId + ", " + itemId + ", " + quantity);
        db.query(query, [cartId, itemId, quantity])
          .then(data => {
            console.log("new item added: ", data.rows[0]);
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/remove", (req, res) => {
    const itemId = req.body.item_id;
    const query = `
    DELETE FROM order_items
    WHERE id = $1
    `;
    db.query(query, [itemId])
      .then(data => {
        return res.redirect("/cart");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/place_order", (req, res) => {
    if (!req.cookies.user_id) {
      res.send("Log in as a user first!");
    }
    const instr = req.body.specialInstructions;
    const userId = req.cookies.user_id;

    // 1. get cart for userId
    const query = `
      SELECT id FROM orders
      WHERE user_id = $1 AND type='cart'
        `;
    db.query(query, [userId])
      .then(data => {
        // 2. update set type=order, special_instructions=instr
        const query = `UPDATE orders SET type = 'order', special_instructions = $1
        WHERE id = $2 AND type = 'cart'`;
        db.query(query, [instr, data.rows[0].id])
          .then(data => {
            //creating a new cart
            const query = `
              INSERT INTO orders(user_id, type)
              VALUES($1, 'cart')
              RETURNING *;
              `;
            db.query(query, [userId])
              .then(data => {
                console.log("new cart created: ", data.rows[0]);
                messageRestaurant(data.rows[0].id)
              })
              .catch(err => {
                res
                  .status(500)
                  .json({ error: err.message });
              });
            //res.clearCookie("user_id", req.cookies.user_id); //clear cookie
            res.redirect('order_placed');

          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  router.get("/order_placed", (req, res) => {
    res.render('order_placed');
  });

  return router;
};
