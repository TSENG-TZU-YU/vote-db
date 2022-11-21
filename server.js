const { default: axios } = require("axios");
const express = require("express");
const app = express();
// 初始化 dotenv
require("dotenv").config();
// 利用 express 這個框架/函式庫 來建立一個 web application
const port = process.env.SERVER_PORT;
const pool = require("./utils/db.js");
const path = require("path");
const cors = require("cors");
const corsOptions = {
  // 如果要讓 cookie 可以跨網域存取，這邊要設定 credentials
  // 且 origin 也要設定
  credentials: true,
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOptions));
app.use(express.json());



let todo=require('./routers/todo');
app.use('/api/todo',todo);

let vote=require('./routers/vote');
app.use('/api/vote',vote);



// 啟動 server，並且開始 listen 一個 port
app.listen(port, () => {
  console.log(`server start at ${port}`);
});
