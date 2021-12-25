const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");
const Auth = require("./lib/Auth");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const service = require("./lib/service");
const Controller = require("./lib/controller");
const dataHandler = new Controller(service);
const auth = new Auth();
const corsOptions = {
  origin: "https://localhost:3001",
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
    if (authKey === "undefined") {
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
    const hash = JSON.parse(passwordHash)[username].password;
    const salt = JSON.parse(passwordHash)[username].salt;
    console.log(hash);
    console.log(salt);
    const result = await auth.validateKey(password, salt, hash);

    if (!result) throw new Error("");
    const authKey = auth.createToken(username);
    dataHandler.setUser(username);
    res.send(JSON.stringify({ username, authKey }));
  } catch (e) {
    res.status(404).send("user info not found");
  }
});

app.get("/auth", async (req, res) => {
  try {
    const authKey = req.headers.authorization;
    if (authKey === "undefined") {
      res.status(200).send("false");
      return;
    }
    const result = auth.validateToken(authKey);
    if (result) await dataHandler.setUser(result.username);
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
const option = {
  key: fs.readFileSync(__dirname + "/key.pem", "utf-8"),
  cert: fs.readFileSync(__dirname + "/cert.pem", "utf-8"),
};
try {
  https.createServer(option, app).listen(443, () => {
    console.log("server is running with https");
  });
} catch (e) {
  http.createServer(app).listen(8080, () => {
    console.log(e.message);
    console.log("server is running with http");
  });
}
