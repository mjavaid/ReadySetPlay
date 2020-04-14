import { Author } from './../../models/author.model';
import { UserService } from './../../services/user.service';
import { Message } from './../../models/message.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'rsg-message',
  templateUrl: 'message.component.html',
  styleUrls: ['message.component.scss']
})
export class MessageCompoent {

  @Input() message: Message;

  constructor(private userService: UserService) {}

  authorName(author: Author) {
    return this.userService.me && this.userService.me.name === author.name ?
      'You' : author.name;
  }

}
