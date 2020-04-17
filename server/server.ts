import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { AddressInfo } from 'net';

import { DbStore } from './dbstore/dbstore';
import {
  User, Message
} from './dbstore/models/index';

process.title = 'game-server';

const webSocketsServerPort = 1337,
  clients: any = [],
  colors: string[] = [ 'red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange' ];
let history: Message[] = [],
  lastColorIdx = -1;
const dbstore = new DbStore();

const getRandomColor = function() {
  lastColorIdx++
  return colors[lastColorIdx % colors.length];
};

const app = express();

console.log('ABOUT TO GET MESSAGES ... ');
dbstore.getMessages((messages: any) => {
  history = messages;
});

app.get('/', (req, res) => res.send('Hello World!'));

const server = http.createServer(app);

const wss = new WebSocket.Server({
  server,
  path: '/game-socket'
});

wss.on('connection', (conn: WebSocket) => {
  clients.push(conn) - 1;
  let user: User;

  console.log(`${(new Date())} Connection accepted.`);

  if (history.length > 0) {
    conn.send(
      JSON.stringify({ type: 'history', data: history })
    );
  }

  conn.on('message', (message: string) => {
    console.log('MESSAGE CAME IN:', message);

    let msgText: any;
    try {
      msgText = JSON.parse(message);
    } catch (e) { return; }

    if (!user) {

      dbstore.getUserByName(msgText, (found: User) => {
        if (found) {

          user = found;
          conn.send(
            JSON.stringify({ type: 'color', data: user.color })
          );

        } else {

          const color = getRandomColor();
          const ts = (new Date()).getTime();
          user = new User(msgText, color, ts, ts, 'demo', 'demo');
          dbstore.saveUser(
            user,
            (userId: number) => {
              user.id = userId;
              console.log(`${(new Date())} User is known as: ${user.name} with ${user.color} color`);
              conn.send(
                JSON.stringify({ type: 'color', data: color })
              );
            }
          );

        }
      });

    } else {

      console.log(`${(new Date())} Received message from ${user.name}: ${msgText}`);

      const obj = new Message(msgText, user.id, (new Date()).getTime());
      dbstore.saveMessage(obj, (msg: Message, msgId: number) => {
        msg.id = msgId;
        history.push(msg);
        history = history.slice(-100);

        const json = JSON.stringify({ type: 'message', data: msg });
        clients.forEach((client: any) => {
          client.send(json);
        });
      });

    }
  });
});

server.listen(process.env.PORT || webSocketsServerPort, () => {
  console.log(`Server started on port ${(server.address() as AddressInfo).port} :)`);
});
