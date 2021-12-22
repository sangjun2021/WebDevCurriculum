const express = require("express");
const Auth = require("./lib/Auth");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./models");
const DB = require("./lib/Db");
const dataHandler = new DB(sequelize);
const auth = new Auth();
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use((req, res, next) => {
  try {
    res.setHeader("content-type", "application/json");
    const authKey = req.headers.authorization;
    console.log(typeof authKey);
    if (authKey === "undefined") {
      console.log("토큰없음");
      next();
      return;
    }
    const result = auth.validateToken(authKey);
    if (result) dataHandler.setUser(result.username);
    next();
  } catch (e) {
    res.status(404).send();
  }
});
app.post("/login", async (req, res) => {
  try {
    const passwordHash = await dataHandler.getUserPasswordList(
      "userList",
      "userPassword"
    );
    const { username, password } = req.body;
    const value = JSON.parse(passwordHash)[username];
    const key = password;
    const result = auth.validate(key, value);

    if (!result) throw new Error("");
    const authKey = auth.createToken(username);
    dataHandler.setUser(username);
    res.send(JSON.stringify({ username, authKey }));
  } catch (e) {
    res.status(404).send("user info not found");
  }
});

app.get("/auth", (req, res) => {
  try {
    console.log("인증요청 들어옴");
    const authKey = req.headers.authorization;
    if (authKey === "undefined") {
      res.status(200).send("false");
      return;
    }
    const result = auth.validateToken(authKey);
    if (result) dataHandler.setUser(result.username);
    result
      ? res.status(200).send(JSON.stringify(result.username))
      : res.status(200).send("false");
  } catch (e) {
    res.status(500).send();
  }
});

app.get("/check/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const data = await dataHandler.getFileList();
    const matchFile = JSON.parse(data).filter((file) => file.title === title);
    const isOverLap = matchFile.length;
    res.send(JSON.stringify(isOverLap));
  } catch (e) {
    res.status(500).send();
  }
});
app.get("/post/list", async (req, res) => {
  try {
    const data = await dataHandler.getFileList();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send();
  }
});
app.get("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await dataHandler.getFile(id);
    res.status(200).send(JSON.stringify(data));
  } catch (e) {
    res.status(500).send();
  }
});
app.post("/post", async (req, res) => {
  try {
    const id = uuidv4();
    await dataHandler.writeFile(id, req.body);
    const data = await dataHandler.getFile(id);
    res.status(200).send(JSON.stringify(data));
  } catch (e) {
    res.status(500).send();
  }
});
app.delete("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await dataHandler.deleteFile(id);
    res.status(200).send("ok");
  } catch (e) {
    res.status(500).send();
  }
});

app.put("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await dataHandler.writeFile(id, req.body);
    const data = await dataHandler.getFile(id);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send();
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something broke!");
});
app.listen(8080, () => {
  console.log("server is running at 8080");
});
