// load .env data into process.env
require("dotenv").config();
// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

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

// Separated Routes for each Resource
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");
const cartsRoutes = require("./routes/carts");


// Mount all resource routes
app.use(usersRoutes(db));
app.use("/orders", ordersRoutes(db));
app.use("/carts", cartsRoutes(db));


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  const promise1 = getMenuItems('Bowls');
  const promise2 = getMenuItems('Salads');
  const promise3 = getMenuItems('Drinks');
    Promise.all([promise1, promise2, promise3]).then((all)=>{
      const bowls = all[0].rows;
      const salads = all[1].rows;
      const drinks = all[2].rows;
      console.log(bowls, salads, drinks)
      const templateVars= {
        bowls, salads, drinks
      };
      res.render("index", templateVars);
    }).catch((err) => {
      console.log(err.message)
    })

});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
