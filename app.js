const express = require('express');
const app = express();
const port = 3000;

const storeRouter = require("./routes/store.route");
const menuRouter = require("./routes/menu.route");

const path = require('path');

// HTML, CSS
app.use(express.static(path.join(__dirname, 'assets')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'index.html'));
});

app.listen(port, () => {
  console.log(port, '포트가 열렸습니다');
});
