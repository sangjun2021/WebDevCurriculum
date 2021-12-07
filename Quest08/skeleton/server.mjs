import http from "http";
import { urlUtil } from "./url.mjs";
import { fileUpload, fileSend } from "./file.mjs";
import process from "process";

process.on("uncaughtException", (error) => {
  console.error(error.message);
});

const server = http.createServer((req, res) => {
  const urlObject = urlUtil(req.url);
  switch (req.method) {
    case "GET":
      switch (urlObject.path) {
        case "/":
          res.writeHead(200, {
            "Content-Type": "text/html",
          });
          res.end("<h1>Hello World</h1>");
          break;
        case "/foo":
          res.write("Hello,");
          res.end(urlObject.query.bar);
          break;
        case "/pic/show":
          res.writeHead(200, {
            "Content-Type": "image/jpg",
            "Content-Disposition": "inline",
          });
          fileSend(res, "./pic.jpg");
          req.on("end", () => {
            res.end("ok");
          });
          break;
        case "/pic/download":
          res.writeHead(200, {
            "Content-Type": "image/jpg",
            "Content-Disposition": "attachment; filename=pic.jpg",
          });
          fileSend(res, "./pic.jpg");
          req.on("end", () => {
            res.end("ok");
          });
          break;
        default:
          res.writeHead(404, {
            "Content-Type": "text/plain; charset=utf-8",
          });
          res.end("잘못된 요청입니다.");
      }
    case "POST":
      switch (urlObject.path) {
        case "/foo":
          req.on("data", (chunk) => {
            const body = JSON.parse(chunk.toString());
            res.writeHead(200, {
              "Content-Type": "text/plain",
            });
            res.write("Hello,");
            res.end(body.bar);
          });
          break;
        case "/pic/upload":
          fileUpload(req, "./pic.jpg");
          req.on("end", () => {
            res.writeHead(200);
            res.end("file upload complete");
          });
          break;
        default:
          res.writeHead(404, {
            "Content-Type": "text/plain; charset=utf-8",
          });
          res.end("잘못된 요청입니다.");
      }
  }
});

server.listen(8080);
