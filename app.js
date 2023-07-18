const express = require('express');
const app = express();
const port = 3000;

const path = require('path');

// cookie parser
const cookieParser = require("cookie-parser");

const storeRouter = require("./routes/storeRoute.js");
const checkRouter = require("./routes/checkRoute.js");
const menuRouter = require("./routes/menuRoute.js");

// Middleware ==================================================
app.use(express.json()); // req.body parser
app.use(cookieParser()); // cookie parser
// app.use(cors()); // front-back connect

// localhost:3000/api/
app.use('/api', [storeRouter, checkRouter, menuRouter]);

// Middleware ==================================================

// HTML, CSS
app.use(express.static(path.join(__dirname, 'assets')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'index.html'));
});

app.listen(port, () => {
  console.log(port, '포트가 열렸습니다');
});
