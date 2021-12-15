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
  { username: "user1", authKey: "" },
  { username: "user2", authKey: "" },
  { username: "user3", authKey: "" },
];
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use((req, res, next) => {
  try {
    res.setHeader("content-type", "application/json");
    const { authKey } = req.cookies;
    const result = session.filter((item) => item.authKey === authKey);
    if (result.length) dataHandler.setUser(result[0].username);
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
    const authKey = uuidv4();
    session.forEach((item) => {
      if (item.username === username) item.authKey = authKey;
    });
    dataHandler.setUser(username);
    res.cookie("authKey", authKey, {
      maxAge: 60 * 60 * 12,
    });
    res.send(JSON.stringify({ username }));
  } catch (e) {
    res.status(404).send("user info not found");
  }
});

app.get("/auth", (req, res) => {
  try {
    const { authKey } = req.cookies;
    const result = session.filter((item) => item.authKey === authKey);
    if (result.length) dataHandler.setUser(result[0].username);
    result.length
      ? res.send(JSON.stringify(result[0].username))
      : res.send("false");
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
app.delete("/logout", (req, res) => {
  try {
    const { authKey } = req.cookies;
    session.forEach((item) => {
      if (item.authKey === authKey) item.authKey = "";
    });
    dataHandler.setUser("");
    res.cookie("authKey", 0, {
      maxAge: 0,
    });
    res.send();
  } catch (e) {
    console.log(e);
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
