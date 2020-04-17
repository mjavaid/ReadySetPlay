export class Message {

  constructor(
    public message: string,
    public sender: number,
    public sent_on: number,
    public id: number = -1
  ) {}

  static createQuery() {
    return `
      CREATE TABLE IF NOT EXISTS message(
        id integer primary key autoincrement,
        message text,
        sent_on integer,
        sender integer,
        FOREIGN KEY(sender) REFERENCES user(id)
      )
    `;
  }

  static getQuery(where = '') {
    return `SELECT message.*, user.name, user.color FROM message ${where} INNER JOIN user on user.id = message.sender`;
  }

  static saveQuery() {
    return 'INSERT INTO message (message, sender, sent_on) VALUES (?, ?, ?)';
  }
}
