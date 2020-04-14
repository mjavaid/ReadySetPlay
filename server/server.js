'use strict';

const webSocketServer = require('websocket').server;
const http = require('http');

process.title = 'game-server';

const webSocketsServerPort = 1337,
  clients = [],
  colors = [ 'red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange' ];
let history = [];

function htmlEntities(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const server = http.createServer(function(request, response) {});
server.listen(webSocketsServerPort, function() {});

const wsServer = new webSocketServer({
  httpServer: server
});

wsServer.on('request', function(request) {
  console.log(`${(new Date())} Connection from origin ${request.origin}`);

  const conn = request.accept(null, request.origin);

  const index = clients.push(conn) - 1;
  let userName,
    userColor;

  console.log(`${(new Date())} Connection accepted.`);

  if (history.length > 0) {
    conn.sendUTF(
      JSON.stringify({ type: 'history', data: history })
    );
  }

  conn.on('message', function(message) {
    if (message.type === 'utf8') {
      let msgText;
      try {
        msgText = JSON.parse(message.utf8Data);
      } catch (e) { return; }
      if (!userName) {
        userName = msgText; // message htmlEntities(message.utf8Data);
        userColor = colors.shift();
        conn.sendUTF(
          JSON.stringify({ type: 'color', data: userColor })
        );
        console.log(`${(new Date())} User is known as: ${userName} with ${userColor} color`);
      } else {
        console.log(`${(new Date())} Received message from ${userName}: ${msgText}`);

        const obj = {
          time: (new Date()).getTime(),
          text: msgText, // htmlEntities(message.utf8Data),
          author: userName,
          color: userColor
        };
        history.push(obj);
        history = history.slice(-100);

        const json = JSON.stringify({ type: 'message', data: obj });
        clients.forEach((client) => {
          client.sendUTF(json);
        });
      }
    }
  });

  conn.on('close', function(connection) {
    if (userName && userColor) {
      console.log(`${(new Date())} Peer ${connection.remoteAddress} disconnected`);

      clients.splice(index, 1);
      colors.push(userColor);
    }
  });
});
