/*
 * All routes for Carts are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
//--------------------------IN PROGRESS!!!------------------------------------
module.exports = (db) => {
  router.get("/:id", (req, res) => {
    let query = `SELECT * FROM orders WHERE id = $1 WHERE type='cart'`; //pull user_id from cookie
    let options = [req.params.id];

    console.log(query);
    db.query(query, options)
      .then(data => {
        const orders = data.rows;
        res.json({ orders });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/:id", (req, res) => { // (user_id, type) values($1, 'cart')
    let query = `INSERT INTO orders(user_id)
    VALUES($1)
    RETURNING *;`;
    let options = [req.body.id];

    console.log(query);
    db.query(query, options)
      .then(data => {
        const orders = data.rows;
        res.json({ orders });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.put("/:id", (req, res) => { //update
    //if completed then
    let query = `UPDATE orders SET special_instructions
    VALUES($1) WHERE order_id = $2`;


    let options = [req.body.special_instructions, req.params.id];

    console.log(query);
    db.query(query, options)
      .then(data => {
        const orders = data.rows;
        res.json({ orders });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
