// load .env data into process.env
require("dotenv").config();
// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require('cookie-parser');

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

app.use(cookieParser());

// Separated Routes for each Resource
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");
const cartsRoutes = require("./routes/carts");
const { getMenuItems } = require("./db/db_pg");

// Mount all resource routes
app.use(usersRoutes(db));
app.use("/orders", ordersRoutes(db));
app.use("/carts", cartsRoutes(db));

// Home page FOR PARTICULAR USER
app.get("/", (req, res) => {
  const promises = [
    getMenuItems('Bowls'),
    getMenuItems('Salads'),
    getMenuItems('Drinks'),
  ];
  if (req.cookies.user_id) {
    const userId = req.cookies.user_id;
    const query = `
    SELECT * FROM order_items
    JOIN orders ON orders.id = order_id
    WHERE user_id = ${userId}`;
    promises.push(
      db.query(query)
        .then(data => data.rows)
        .catch(error => error));
  }

  Promise.all(promises)
    .then((all) => {
      const bowls = all[0].rows;
      const salads = all[1].rows;
      const drinks = all[2].rows;
      console.log(bowls, salads, drinks);
      //const userOrders = user_id_cookie ? all[3].rows : []
      const templateVars = {
        bowls, salads, drinks
      };
      res.render('index', templateVars);
    }).
    catch((err) => {
      console.log(err.message);
    });
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
