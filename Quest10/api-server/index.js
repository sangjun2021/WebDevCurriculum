const express = require("express");
const File = require("./lib/File");
const Auth = require("./lib/Auth");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const dataHandler = new File();
const auth = new Auth();
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};
const session = [
  { username: "user1", sid: "" },
  { username: "user2", sid: "" },
  { username: "user3", sid: "" },
];
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader("content-type", "application/json");
  const { sid } = req.cookies;
  const result = session.filter((item) => item.sid === sid);
  if (result.length) dataHandler.setUser(result[0].username);
  next();
});
app.post("/login", async (req, res) => {
  const passwordHash = await dataHandler.getUserPasswordList(
    "userList",
    "userPassword"
  );
  const { username, password } = req.body;
  const value = JSON.parse(passwordHash)[username];
  const key = password;
  const result = auth.validate(key, value);
  if (!result) {
    res.status(404).send("not fount user info");
    return;
  }
  const sid = uuidv4();
  session.forEach((item) => {
    if (item.username === username) item.sid = sid;
  });
  dataHandler.setUser(username);
  res.cookie("sid", sid, {
    maxAge: 60 * 60 * 3600,
  });
  res.send(JSON.stringify({ username }));
});
app.get("/auth", (req, res) => {
  const { sid } = req.cookies;
  const result = session.filter((item) => item.sid === sid);
  if (result.length) dataHandler.setUser(result[0].username);
  result.length
    ? res.send(JSON.stringify(result[0].username))
    : res.send("false");
});

app.get("/check/:title", async (req, res) => {
  const { title } = req.params;
  const data = await dataHandler.getFileList();
  const matchFile = JSON.parse(data).filter((file) => file.title === title);
  const isOverLap = matchFile.length;
  res.send(JSON.stringify(isOverLap));
});
app.get("/post/list", async (req, res) => {
  const data = await dataHandler.getFileList();
  res.status(200).send(data);
});
app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const data = await dataHandler.getFile(id);
  res.status(200).send(JSON.stringify(data));
});
app.post("/post", async (req, res) => {
  const id = uuidv4();
  await dataHandler.writeFile(id, req.body);
  const data = await dataHandler.getFile(id);
  res.status(200).send(JSON.stringify(data));
});
app.delete("/post/:id", async (req, res) => {
  const { id } = req.params;
  await dataHandler.deleteFile(id);
  res.status(200).send("ok");
});
app.put("/post/:id", async (req, res) => {
  const { id } = req.params;
  await dataHandler.writeFile(id, req.body);
  const data = await dataHandler.getFile(id);
  res.status(200).send(data);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something broke!");
});
app.listen(8080, () => {
  console.log("server is running at 8080");
});
