const sqlite3 = require('sqlite3').verbose();

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
    this.db.run(`
      CREATE TABLE IF NOT EXISTS message(
        id integer primary key autoincrement,
        sent integer,
        message text,
        user integer
      )
    `);

    this.db.run(`
      CREATE TABLE IF NOT EXISTS user(
        id integer primary key autoincrement,
        name text,
        color text,
        created integer,
        last_online integer
      )
    `);
  }

  getMessages(callback: any) {
    this.db.all('SELECT * FROM message;', (err: any, res: any) => {
      callback(res);
    });
  }

  saveMessage(message: any, callback?: any) {
    this.db.run(`
      INSERT INTO message (sent, message, user) VALUES (
        ${message.sentOn}, '${message.text}', ${message.author}
      )
    `, (err: any, res: any) => {
      if (callback) { callback(res); }
    });
  }

  saveUser(user: any, callback?: any) {
    const ts = (new Date()).getTime();
    this.db.run(`
      INSERT INTO user (name, color, created, last_online) VALUES (
        '${user.name}', '${user.color}', ${ts}, ${ts}
      )
    `, function(err: any, res: any) {
      console.log(err, '|', res);
      // @ts-ignore
      console.log(this.lastID);
      if (callback) { callback(res); }
    });
  }

  userExists() {

  }

}
