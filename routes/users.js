/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/login/:id", (req, res) => {
    if (req.params.id === '1') {
      return res.redirect("/orders");
    }
    db.query(`SELECT * FROM users WHERE id = $1`, [req.params.id])
      .then(data => {
        const users = data.rows;
        res.cookie("user_id", users[0].id); //sets up a cookie
        const userId = req.params.id;
        //pull out user's cart if exists
        const query = `
        SELECT id FROM orders
                WHERE user_id = $1 AND type='cart'`;
        db.query(query, [userId])
          .then(data => {
            if (!data.rows.length) {
              //creating a new cart
              const query = `
              INSERT INTO orders(user_id, type)
                      VALUES($1, 'cart')
                      RETURNING *;`;
              db.query(query, [userId])
                .then(() => {
                })
                .catch(err => {
                  res
                    .status(500)
                    .json({ error: err.message });
                });
            }
            res.redirect("/");
          });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
