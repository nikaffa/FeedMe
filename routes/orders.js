/*
 * All routes for Orders are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const promises = [];
    let query = `
    SELECT orders.id as incoming_orderId,  items.name, quantity, price, special_instructions FROM orders
    JOIN order_items ON orders.id = order_id
    JOIN items ON items.id = item_id
    WHERE orders.type='order' and accepted_at is null and completed = FALSE
    GROUP BY incoming_orderId, quantity, items.name, items.price ORDER BY incoming_orderId`;
    promises.push(db.query(query));
    query = `
    SELECT orders.id as current_orderId,  items.name, quantity, price, special_instructions FROM orders
    JOIN order_items ON orders.id = order_id
    JOIN items ON items.id = item_id
    WHERE orders.type='order' and accepted_at is not null and completed = FALSE
    GROUP BY current_orderId, quantity, items.name, items.price ORDER BY current_orderId`;
    promises.push(db.query(query));

    Promise.all(promises)
      .then(all => {
        const currentOrders = all[0].rows;
        console.log(currentOrders);
        const incomingOrders = all[1].rows;
        const templateVars = { incomingOrders, currentOrders };
        res.render("adminOrders", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  // router.post("/:id/accept", (req, res) => { // (user_id, type) values($1, 'cart')
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

  router.post("/:id/accept", (req, res) => { //if accepted
    let query = `UPDATE orders SET accepted_at = CURRENT_TIMESTAMP
    WHERE id = $1 AND type = 'order'`;
    let options = [req.params.id]; //order.id??
    console.log(query);
    db.query(query, options)
      .then(data => {
        const order = data.rows;
        res.json({ order });
        //update at front-end and send 1st notification
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.post("/:id/complete", (req, res) => { //if accepted
    let query = `UPDATE orders SET completed = TRUE
    WHERE id = $1 AND type = 'order'`;
    let options = [req.params.id]; //order.id??
    console.log(query);
    db.query(query, options)
      .then(data => {
        const order = data.rows;
        res.json({ order });
        //update at front-end and send 2st notification
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  return router;
};
