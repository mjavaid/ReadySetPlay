import { Author } from './author.model';
export class Message {
  constructor(
    readonly message: string,
    readonly author: Author,
    readonly timestamp: number) {}
}
