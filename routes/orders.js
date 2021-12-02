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
    SELECT orders.id AS order_id,  items.name, quantity, price, special_instructions FROM order_items
    JOIN orders on order_id = orders.id
    JOIN items ON items.id = item_id
    WHERE orders.type='order' and accepted_at is null and completed = FALSE
    GROUP BY orders.id, quantity, items.name, items.price ORDER BY order_id`;
    promises.push(db.query(query));
    query = `
    SELECT orders.id as order_id,  items.name, quantity, price, special_instructions FROM orders
    JOIN order_items ON orders.id = order_id
    JOIN items ON items.id = item_id
    WHERE orders.type='order' and accepted_at is not null and completed = FALSE
    GROUP BY orders.id, quantity, items.name, items.price ORDER BY order_id`;
    promises.push(db.query(query));

    query = `SELECT id FROM ORDERS

    WHERE type='order' AND accepted_at IS NULL AND completed = FALSE`;
    promises.push(db.query(query));
    query = `SELECT id FROM ORDERS
    WHERE type='order' AND accepted_at IS NOT NULL AND completed = FALSE`;

    promises.push(db.query(query));

    Promise.all(promises)
      .then(all => {
        const currentOrders = all[1].rows;
        console.log(currentOrders);
        const incomingOrders = all[0].rows;
        const currentOrderNums = all[3].rows;
        const incomingOrderNums = all[2].rows;
        console.log(incomingOrderNums)


        const templateVars = { incomingOrders, currentOrders, currentOrderNums, incomingOrderNums };
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

  router.post("/accept/:id", (req, res) => { //if accepted
    let query = `UPDATE orders SET accepted_at = CURRENT_TIMESTAMP
    WHERE id = $1 AND type = 'order'`;
    db.query(query, [req.params.id])
      .then(data => {
        console.log(data);
        res.redirect("/orders");
        //update at front-end
        //send 1st notification
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.post("/complete/:id", (req, res) => { //if completed
    let query = `UPDATE orders SET completed = TRUE
    WHERE id = $1 AND type = 'order'`;
    db.query(query, [req.params.id])
      .then(data => {
        console.log(data);
        res.redirect("/orders");
        //update at front-end
        //send 2st notification
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  return router;
};
