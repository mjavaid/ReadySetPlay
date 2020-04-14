import { Author } from './../models/author.model';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  me: Author;

  constructor() {}

  setMe(author: Author) {
    this.me = author;
  }

}
