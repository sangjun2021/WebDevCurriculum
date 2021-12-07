import fs from "fs";

export function fileUpload(req, fileName) {
  const writeStream = fs.createWriteStream(fileName);
  req.pipe(writeStream);
}

export function fileSend(res, fileName) {
  const readStream = fs.createReadStream(fileName);
  readStream.on("open", () => {
    readStream.pipe(res);
  });
}
