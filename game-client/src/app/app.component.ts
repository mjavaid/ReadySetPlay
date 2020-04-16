import { UserService } from './services/user.service';
import { Author } from './models/author.model';
import { Message } from './models/message.model';
import { RestService } from './services/rest.service';
import { Component } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'game-client';

  infoMsg = 'Your Name';
  chatMessage = '';
  messages: Message[] = [];
  chatWebSocket: WebSocketSubject<any>;
  isDisabled = false;

  constructor(
    private restService: RestService,
    private userService: UserService) {
    this.chatWebSocket = webSocket('ws://127.0.0.1:1337/game-socket');
    this.chatWebSocket.subscribe(msg => {
      this.handleMessage(msg);
    },
    err => {
      this.infoMsg = `Sorry, but there's some problem with your connection or server is down.`;
      this.isDisabled = true;
    });
  }

  handleMessage(json: any) {
    if (json.type === 'color') {
      this.userService.me.color = json.data;
      this.infoMsg = this.userService.me.name;
      this.isDisabled = false;
    } else if (json.type === 'history') {
      this.messages = json.data.map(d => {
        return new Message(
          d.text, new Author(d.author, d.color), d.time
        );
      });
    } else if (json.type === 'message') {
      this.isDisabled = false;
      this.messages.push(new Message(
        json.data.text, new Author(
          json.data.author,
          json.data.color
        ),
        json.data.time
      ));
    } else {
      console.warn(`Hmmm ... Unknown response type: ${json.type}`);
    }
  }

  onKeyUp(event) {
    if (event.keyCode === 13) {
      if (!this.chatMessage) { return; }

      this.chatWebSocket.next(this.chatMessage);

      if (!this.userService.me) {
        this.userService.setMe(new Author(this.chatMessage, undefined));
      }
      this.isDisabled = true;

      this.chatMessage = '';
    }
  }

  disable() {
    return this.isDisabled;
  }

}
