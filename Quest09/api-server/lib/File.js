const fs = require("fs");

module.exports = {
  getFile: (res, id, callback) => {
    const readStream = fs.createReadStream(`files/${id}.json`);
    readStream.on("open", () => {
      readStream.pipe(res);
    });
    readStream.on("finish", () => {
      callback();
    });
  },
  deleteFile: (res, id) => {},
  updateFile: (res, id, data) => {},
  createFile: (res, id, text) => {
    fs.writeFile(
      `files/${id}.json`,
      JSON.stringify({ title: "새파일", text }),
      (err) => {
        if (err) throw err;
        res.send("ok");
      }
    );
  },
  getFileList: (res) => {
    fs.readdir("files", (error, files) => {
      let buffer = [];
      files.forEach((file) => {
        const id = file.split(".")[0];
        buffer.push(id);
      });
      res.send(buffer);
    });
  },
};
