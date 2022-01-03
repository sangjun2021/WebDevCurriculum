const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');

const app = express();

app.use(express.static('public'));

const option = {
  key: fs.readFileSync(`${__dirname}/keys/key.pem`, 'utf-8'),
  cert: fs.readFileSync(`${__dirname}/keys/cert.pem`, 'utf-8'),
};

https.createServer(option, app).listen(3001, () => {
  console.log('server is running at 3001 with https');
});

http
  .createServer((req, res) => {
    console.log(' redicrect request to https ');
    res.writeHead(301, {
      Location: 'https://' + `localhost:3001${req.url}`,
    });
    res.end();
  })
  .listen(3000, () => {
    console.log('server is running at 3000 with http');
  });
