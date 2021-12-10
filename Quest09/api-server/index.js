const express = require("express");
const File = require("./lib/File");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const app = express();
const FileHandler = new File();
app.use(express.json());
app.get("/post/list", async (req, res) => {
  const data = await FileHandler.getFileList();
  res.status(200).send(data);
});
app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const data = await FileHandler.getFile(id);
  res.status(200).send(data);
});
app.post("/post/", async (req, res) => {
  const id = uuidv4();
  const { title, text } = req.body;
  await FileHandler.writeFile(id, title, text);
  res.status(200).send(id);
});
app.delete("/post/:id", async (req, res) => {
  const { id } = req.params;
  await FileHandler.deleteFile(id);
  res.status(200).send("ok");
});
app.put("/post/:id", async (req, res) => {
  const { id } = req.params;
  const { title, text } = req.body;
  await FileHandler.writeFile(id, title, text);
  res.status(200).send("ok");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.listen(8080, () => {
  console.log("server is running aot 8080");
});
