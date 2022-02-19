/*
 * All routes for Orders are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

require('dotenv').config();

// Enable twilio for production
// const twilio = require('twilio')(accountSid, authToken);
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const twilioNumber = process.env.TWILIO_NUMBER;
// const resturantNumber = process.env.RESTAURANT_NUMBER;
// const {messageCustomer, messageRestaurant, messageOrderReady } = require('./twilio')

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

    query = `
    SELECT id FROM ORDERS
          WHERE type='order' AND accepted_at IS NULL AND completed = FALSE`;
    promises.push(db.query(query));
    query = `
    SELECT id FROM ORDERS
          WHERE type='order' AND accepted_at IS NOT NULL AND completed = FALSE`;
    promises.push(db.query(query));

    Promise.all(promises)
      .then(all => {
        const currentOrders = all[1].rows;
        const incomingOrders = all[0].rows;
        const currentOrderNums = all[3].rows;
        const incomingOrderNums = all[2].rows;

        const templateVars = { incomingOrders, currentOrders, currentOrderNums, incomingOrderNums };
        res.render("adminOrders", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  router.post("/accept/:id", (req, res) => { //if accepted
    // messageCustomer(req.params.id, req.body.estimated_time)

    const query = `
    UPDATE orders SET accepted_at = CURRENT_TIMESTAMP, completion_time = $1
          WHERE id = $2 AND type = 'order'`;
    db.query(query, [req.body.estimated_time, req.params.id])
      .then(() => {
        res.redirect("/orders");
        //send 1st notification

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/complete/:id", (req, res) => { //if completed
    const query = `
    UPDATE orders SET completed = TRUE
           WHERE id = $1 AND type = 'order'`;
    db.query(query, [req.params.id])
      .then(() => {
        res.redirect("/orders");
        //send 2st notification
        // messageOrderReady(req.params.id);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
