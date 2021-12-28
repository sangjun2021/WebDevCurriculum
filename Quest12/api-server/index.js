const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const controller = require("./controllers/index");

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
    const result = controller.validateToken(authKey);
    if (result) controller.setUser(result.username);
    next();
  } catch (e) {
    console.log(e);
    res.status(404).send();
  }
});
app.post("/login", async (req, res) => {
  try {
    const passwordHash = await controller.getUserPasswordList();
    const { username, password } = req.body;
    const hash = passwordHash[username].password;
    const salt = passwordHash[username].salt;
    const result = await controller.validateKey(password, salt, hash);
    if (!result) throw new Error("");
    const authKey = controller.createToken(username);
    controller.setUser(username);
    res.send(JSON.stringify({ username, authKey }));
  } catch (e) {
    console.log(e);
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
    const result = controller.validateToken(authKey);
    if (result) await controller.setUser(result.username);
    result
      ? res.status(200).send(JSON.stringify(result.username))
      : res.status(200).send("false");
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

app.get("/check/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const data = await controller.getFileList();
    const matchFile = data.filter((file) => file.title === title);
    const isOverLap = matchFile.length;
    res.send(JSON.stringify(isOverLap));
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});
app.get("/post/list", async (req, res) => {
  try {
    const data = await controller.getFileList();
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});
app.get("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await controller.getFile(id);
    res.status(200).send(JSON.stringify(data));
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});
app.post("/post", async (req, res) => {
  try {
    const id = uuidv4();
    await controller.writeFile(id, req.body);
    const data = await controller.getFile(id);
    res.status(200).send(JSON.stringify(data));
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});
app.delete("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await controller.deleteFile(id);
    res.status(200).send("ok");
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

app.put("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await controller.writeFile(id, req.body);
    const data = await controller.getFile(id);
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something broke!");
});
const option = {
  key: fs.readFileSync(__dirname + "/keys/key.pem", "utf-8"),
  cert: fs.readFileSync(__dirname + "/keys/cert.pem", "utf-8"),
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
