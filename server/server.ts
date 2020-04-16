import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { AddressInfo } from 'net';
import { DbStore } from './dbstore';

process.title = 'game-server';

const webSocketsServerPort = 1337,
  clients: any = [],
  colors: string[] = [ 'red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange' ];
let history: any = [];

const dbstore = new DbStore();

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

const server = http.createServer(app);

const wss = new WebSocket.Server({
  server,
  path: '/game-socket'
});

console.log('CHAT HISTORY:');
dbstore.getMessages((res: any) => { console.log(res); });

wss.on('connection', (conn: WebSocket) => {
  clients.push(conn) - 1;
  let userName: string,
    userColor: string;

  console.log(`${(new Date())} Connection accepted.`);

  if (history.length > 0) {
    conn.send(
      JSON.stringify({ type: 'history', data: history })
    );
  }

  conn.on('message', (message: string) => {
    console.log('MESSAGE CAME IN:', message);
    let msgText;
    try {
      msgText = JSON.parse(message);
    } catch (e) { return; }
    if (!userName) {
      userName = msgText;
      userColor = colors.shift() || 'pink';
      conn.send(
        JSON.stringify({ type: 'color', data: userColor })
      );
      dbstore.saveUser({
        name: userName, color: userColor },
        (res: any) => { console.log('USER SAVED!', res);
      });
      console.log(`${(new Date())} User is known as: ${userName} with ${userColor} color`);
    } else {
      console.log(`${(new Date())} Received message from ${userName}: ${msgText}`);

      const obj = {
        time: (new Date()).getTime(),
        text: msgText,
        author: userName,
        color: userColor
      };
      history.push(obj);
      history = history.slice(-100);

      const json = JSON.stringify({ type: 'message', data: obj });
      clients.forEach((client: any) => {
        client.send(json);
      });
    }
  });
});

server.listen(process.env.PORT || webSocketsServerPort, () => {
  console.log(`Server started on port ${(server.address() as AddressInfo).port} :)`);
});
