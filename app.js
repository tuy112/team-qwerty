const express = require('express');
const app = express();
const port = 3000;// HTML, CSS

const path = require('path');
const dotenv = require('dotenv')
dotenv.config() // => '.env'에서 환경 변수를 불러옵니다.

// cookie parser
const cookieParser = require("cookie-parser");

const storeRouter = require("./routes/storeRoute.js");
const checkRouter = require("./routes/checkRoute.js");
const menuRouter = require("./routes/menuRoute.js");

const UsersRouter = require("./routes/usersOrdersRoute.js");
const UsersOrderRouter = require("./routes/usersReviewsRoute.js");
const UsersReviewRouter = require("./routes/usersRoute.js");

const customerRouter = require("./pages/customerPages.js");
const ceoRouter = require("./pages/ceoPages.js");

// Middleware ==================================================w
app.use(express.json()); // req.body parser
app.use(cookieParser()); // cookie parser
app.use(express.urlencoded({ extended: false })); // URL-encoded 형식의 요청 본문 Parsing

// HTML 형태의 응답(response)을 반환하는 API
app.use(customerRouter, ceoRouter);

// localhost:3000/api/
app.use('/api', [storeRouter, checkRouter, menuRouter, UsersRouter, UsersOrderRouter, UsersReviewRouter]);

// Middleware ==================================================

// HTML, CSS
app.use(express.static(path.join(__dirname, 'assets'))); 
app.set('views', path.join(__dirname, 'assets'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile); 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'index.html'));
});
const express = require('express');
const app = express();
const port = 3000;// HTML, CSS

const path = require('path');

// 환경 변수 설정
const dotenv = require('dotenv')
dotenv.config() // => '.env'에서 환경 변수를 불러옵니다.

// cookie parser
const cookieParser = require("cookie-parser");

const storeRouter = require("./routes/storeRoute.js");
const checkRouter = require("./routes/checkRoute.js");
const menuRouter = require("./routes/menuRoute.js");

const UsersRouter = require("./routes/usersOrdersRoute.js");
const UsersOrderRouter = require("./routes/usersReviewsRoute.js");
const UsersReviewRouter = require("./routes/usersRoute.js");


const customerRouter = require("./pages/customerPages.js")
const ceoRouter = require("./pages/ceoPages.js")

// Middleware
app.use(express.json()); // req.body parser
app.use(cookieParser()); // cookie parser
app.use(express.urlencoded({ extended: false })); // URL-encoded 형식의 요청 본문 Parsing

// HTML 형태의 응답(response)을 반환하는 API
app.use(customerRouter, ceoRouter); 

// localhost:3000/api/
app.use('/api', [storeRouter, checkRouter, menuRouter, UsersRouter, UsersOrderRouter, UsersReviewRouter]);

// HTML, CSS
app.use(express.static(path.join(__dirname, 'assets'))); // Middleware를 사용하여 정적 자원을 제공하기 위해 'assets' Directory를 지정
app.set('views', path.join(__dirname, 'assets')) // '__dirname'과 'assets'을 결합하여 정적 자원의 경로를 설정
app.set('view engine', 'ejs'); // Express에 있는 EJS(Efficient JavaScript) Template Engine을 설정
app.engine('html', require('ejs').renderFile); // '.html' 형식의 자원을 rendering할 때 EJS를 사용하도록 설정
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', './index.html'));
});

// server start
app.listen(port, () => {
  console.log(port, '포트가 열렸습니다~^^');
});