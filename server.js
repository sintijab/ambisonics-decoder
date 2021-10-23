/* eslint-disable */
var express = require('express');
var app = express();
var ws = require('express-ws')(app);
const path = require('path')
const serverPort = process.env.PORT || 8080
const serverHost = '0.0.0.0'

app.use(express.static(path.join(__dirname, 'build')))

app.get('/', ((req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
}))

app.ws('/', (ws, req) => {
  ws.on('message', (msg) => {
    console.log(msg);
  });
  console.log('socket', req.testing);
});


app.listen(serverPort, serverHost, () => {
  console.log('Listening on port %d', serverPort)
})
