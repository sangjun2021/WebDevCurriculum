const myApp = require("./lib/myApp");
const app = new myApp(8080);

app.get("/", (_req, res) => {
  app.setMimeType("html");
  res.end("<h1>hello world</h1>");
});

app.get("/foo", (_req, res, query) => {
  app.setMimeType("text");
  res.end(`Hello, ${query.bar}`);
});

app.get("/pic/show", async (_req, res) => {
  await app.dataSend("pic.jpg");
  app.setMimeType("jpg");
  res.end("ok");
});

app.get("/pic/download", async (_req, res) => {
  app.setMimeType("binary");
  res.setHeader("Content-Disposition", "filename=pic.jpg");
  await app.dataSend("pic.jpg");
  res.end("ok");
});

app.post("/foo", async (_req, res) => {
  await app.dataUpload("foo.json");
  const data = app.readFile("foo.json");
  res.end(JSON.parse(data).bar);
});

app.post("/pic/upload", async (_req, res) => {
  await app.dataUpload("pic.jpg");
  res.end("ok");
});
