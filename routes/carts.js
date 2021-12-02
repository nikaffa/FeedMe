/*
 * All routes for Carts are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
//--------------------------READY------------------------------------
module.exports = (db) => {
  router.get("/", (req, res) => {
    if (req.cookies.user_id) {
      const user = req.cookies.user_id
      const userId = req.cookies.user_id.id;
      console.log(userId);
      const query = `
      SELECT id FROM orders
      WHERE user_id = $1 AND type='cart'
      `;
      db.query(query, [userId])
        .then(data => {
          console.log('data: ', data);
          const query = `
          SELECT orders.id as orderId, items.name, quantity, price, special_instructions FROM items
          JOIN order_items ON items.id = item_id
          JOIN orders ON orders.id = order_id
          WHERE orders.id = $1 AND orders.type='cart'
          GROUP BY orders.id, items.name, quantity, price
          `;
          db.query(query, [data.rows[0].id])
            .then((d) => {
              let subtotal = 0;
              for(i=0; i < d.rows.length; i++) {
                subtotal += (d.rows[i].price * d.rows[i].quantity)/100;
              }
              res.render('cart', {orderItems: d.rows, user, subtotal});
            })
            .catch(err => {
              res
                .status(500)
                .json({error: err.message});
            });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    } else {
      res.send("You are admin");
    }
  });
  //--------------------------IN PROGRESS!!!------------------------------------
  // router.post("/:id", (req, res) => { // (user_id, type) values($1, 'cart')
  //   let query = `INSERT INTO orders(user_id)
  //   VALUES($1)
  //   RETURNING *;`;
  //   let options = [req.body.id];

  //   console.log(query);
  //   db.query(query, options)
  //     .then(data => {
  //       const orders = data.rows;
  //       res.json({ orders });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });

  // router.put("/:id", (req, res) => { //update
  //   //if completed then
  //   let query = `UPDATE orders SET special_instructions
  //   VALUES($1) WHERE order_id = $2`;


  //   let options = [req.body.special_instructions, req.params.id];

  //   console.log(query);
  //   db.query(query, options)
  //     .then(data => {
  //       const orders = data.rows;
  //       res.json({ orders });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });
  return router;
};
