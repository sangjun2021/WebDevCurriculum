const express = require("express");
const File = require("./lib/File");
const app = express();

app.use(express.json());
app.get("/post-list", (req, res) => {
  File.getFileList(res);
});
app.get("/post/:id", (req, res) => {
  const id = req.params.id;
  File.getFile(res, id, () => {
    res.send("ok");
  });
});
app.post("/post/:id", (req, res) => {
  const id = req.params.id;
  File.createFile(res, id, req.body.text);
});
app.delete("/post/:id", (req, res) => {
  console.log(req.body);
  const id = req.params.id;
});
app.put("/post/:id", (req, res) => {
  console.log(req.body);
  const id = req.params.id;
});
app.listen(8080, () => {
  console.log("server is running aot 8080");
});
