const express = require("express");

const app = express();

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("클라이언트 서버 구동..");
});
