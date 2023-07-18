const express = require('express');
const app = express();
const port = 3000;// HTML, CSS

const path = require('path');


// cookie parser
const cookieParser = require("cookie-parser");

const storeRouter = require("./routes/storeRoute.js");
const checkRouter = require("./routes/checkRoute.js");
const menuRouter = require("./routes/menuRoute.js");

const UsersRouter = require("./routes/usersOrdersRoute.js");
const UsersOrderRouter = require("./routes/usersReviewsRoute.js");
const UsersReviewRouter = require("./routes/usersRoute.js");


// Middleware ==================================================
app.use(express.json()); // req.body parser
app.use(cookieParser()); // cookie parser

// localhost:3000/api/
app.use('/api', [storeRouter, checkRouter, menuRouter, UsersRouter, UsersOrderRouter, UsersReviewRouter]);
// Middleware ==================================================

// HTML, CSS
app.use(express.static(path.join(__dirname, 'assets')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'index.html'));
});

app.listen(port, () => {
  console.log(port, '포트가 열렸습니다~^^');
});