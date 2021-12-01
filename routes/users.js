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
        res.cookie("user_id", users[0]); //sets up a cookie

        // 1. db.query(select * from orders where user_id = $users[0] and type='cart')
        // 2.    .then(data => {  })
        //res.json({ users });

        res.redirect("/"); //client page
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });
  return router;
};
