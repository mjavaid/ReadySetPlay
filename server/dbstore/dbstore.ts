const sqlite3 = require('sqlite3').verbose();

import {
  User, Message
} from './models/index';

export class DbStore {
  
  db: any;

  constructor() {
    this.db = new sqlite3.Database(
      './data/rsp.db',
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
    );

    this.init();
  }

  private init() {
    this.db.run(User.createQuery(), (err: any) => {
      if (!err) {
        this.db.run(Message.createQuery());
      }
    });
  }

  getMessages(callback: any) {
    this.db.all(Message.getQuery(), (err: any, messages: any[]) => {
      if (!err) {
        if (callback) {
          callback(messages);
        }
      }
    });
  }

  getUsers(callback: any) {
    this.db.all(User.getQuery(), (err: any, users: User[]) => {
      if (!err) {
        if (callback) {
          callback(users);
        }
      }
    });
  }

  getUserByName(name: string, callback: any) {
    this.db.get(User.getQuery(`WHERE name = ?`), [name], (err: any, row: User) => {
      if (!err && callback) {
        callback(row);
      }
    });
  }

  saveMessage(message: Message, callback?: any) {
    this.db.run(Message.saveQuery(),
     [
       message.message, message.sender, message.sent_on
     ],
     function(err: any, res: any) {
       // @ts-ignore
      if (callback) { callback(message, this.lastID); }
    });
  }

  saveUser(user: User, callback?: any) {
    this.db.run(User.saveQuery(),
      [
        user.name, user.color, user.joined_on,
        user.last_online_on, user.password, user.email
      ],
      function(err: any, res: any) {
        // @ts-ignore
        if (callback) { callback(this.lastID); }
      }
    )
  }

  userExists() {

  }

}
