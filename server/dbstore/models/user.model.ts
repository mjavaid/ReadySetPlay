export class User {

  public readonly table = 'user';

  constructor(
    public name: string,
    public color: string,
    public joined_on: number,
    public last_online_on: number,
    public password: string,
    public email: string,
    public id: number = -1,
  ) {}

  static createQuery() {
    return `
      CREATE TABLE IF NOT EXISTS user(
        id integer primary key autoincrement,
        name text,
        color text,
        joined_on integer,
        last_online_on integer,
        password text,
        email text
      )
    `;
  }

  static getQuery(where = '') {
    return `SELECT * FROM user ${where}`;
  }

  static saveQuery() {
    return 'INSERT INTO user '
      + '(name, color, joined_on, last_online_on, password, email)'
      + ' VALUES (?, ?, ?, ?, ?, ?)';
  }
}
