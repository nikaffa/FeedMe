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
    //const session_id = req.session.userId; //get cookie session
    db.query(`SELECT * FROM users WHERE id = $1`, [req.params.id])
      .then(data => {
        const users = data.rows;
        // set cookie:  req.session.userId = users[0];
        // 1. db.query(select * from orders where user_id = $users[0] and type='cart')
        // 2.    .then(data => {  })

        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
