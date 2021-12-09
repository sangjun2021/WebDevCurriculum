const myApp = require("./myApp");

const app = new myApp(8080);

app.get("/", (req, res) => {
  res.end("hello world");
});
