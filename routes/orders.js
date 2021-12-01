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
    let query = `SELECT * FROM orders WHERE type='order'`;
    console.log(query);
    db.query(query)
      .then(data => {
        const orders = data.rows;
        const templateVars = { orders };
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
    let query = `UPDATE orders SET accepted_at = CURRENT_TIMESTAMP
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
