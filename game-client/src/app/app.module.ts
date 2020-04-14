import { UserService } from './services/user.service';
import { RestService } from './services/rest.service';
import { MessageCompoent } from './components/message/message.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageCompoent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    RestService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
