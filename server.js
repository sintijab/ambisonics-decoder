/* eslint-disable */
const AWS = require('aws-sdk');
var express = require('express');
var app = express();
require('dotenv').config();

// var ws = require('express-ws')(app);
const path = require('path');
const serverPort = process.env.PORT || 8080;
const serverHost = '0.0.0.0';

AWS.config.update({ region: "eu-central-1", accessKeyId: process.env.ACCESS_KEY, secretAccessKey: process.env.SECRET_KEY });
const s3 = new AWS.S3();

function retrieveFile(filename, res) {
  s3.getObject(
    {
      Bucket: 'ambisonics-media',
      Key: filename
    },
    (err, data) => {
      if (data && data.Body) {
        const contentTypeMp3 = filename.includes('mp3');
        const contentTypeMp4 = filename.includes('mp4');
        let mimeType;
        if (contentTypeMp3) {
          mimeType = 'audio/mp3';
        } else if (contentTypeMp4) {
          mimeType = 'audio/mp4';
        }
        if (err)
            return res
                .status(400)
                .json({ msg: "Unable to fetch media", error: err });
        else
        res.set('Content-Type', mimeType);
        return res.send(data.Body);
      } else return res.send({})
    }
);
}

app.use(express.static(path.join(__dirname, 'build')))

app.get('/media/:file_name', (req, res) => {
  retrieveFile(req.params.file_name, res);
});

// app.ws('/connect', (ws, req) => {
//   ws.on('message', (msg) => {
//     console.log(msg);
//   });
//   console.log('socket', req.testing);
// });

app.get('*', ((req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
}))


app.listen(serverPort, serverHost, () => {
  console.log('Listening on port %d', serverPort)
})
