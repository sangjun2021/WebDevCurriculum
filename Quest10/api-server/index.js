const express = require("express");
const File = require("./lib/File");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const FileHandler = new File();
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Content-Type", "application/json");
  next();
});
app.get("/check/:title", async (req, res) => {
  const { title } = req.params;
  const data = await FileHandler.getFileList();
  const matchFile = JSON.parse(data).filter((file) => file.title === title);
  const isOverLap = matchFile.length;
  res.send(JSON.stringify(isOverLap));
});
app.get("/post/list", async (req, res) => {
  const data = await FileHandler.getFileList();
  res.status(200).send(data);
});
app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const data = await FileHandler.getFile(id);
  res.status(200).send(JSON.stringify(data));
});
app.post("/post", async (req, res) => {
  const id = uuidv4();
  await FileHandler.writeFile(id, req.body);
  const data = await FileHandler.getFile(id);
  res.status(200).send(JSON.stringify(data));
});
app.delete("/post/:id", async (req, res) => {
  const { id } = req.params;
  await FileHandler.deleteFile(id);
  res.status(200).send("ok");
});
app.put("/post/:id", async (req, res) => {
  const { id } = req.params;
  await FileHandler.writeFile(id, req.body);
  const data = await FileHandler.getFile(id);
  res.status(200).send(data);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.listen(8080, () => {
  console.log("server is running at 8080");
});
