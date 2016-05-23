import {Component, OnInit, Type} from '@angular/core';
import {Router, Routes, ROUTER_DIRECTIVES} from '@angular/router';
import {MdButton} from '@angular2-material/button/button';
import {MdCard} from '@angular2-material/card/card';
import {MdIcon} from '@angular2-material/icon/icon';
import {MdList, MdListItem} from '@angular2-material/list/list';
import {MdSidenav, MdSidenavLayout} from '@angular2-material/sidenav/sidenav';
import {MdToolbar} from '@angular2-material/toolbar/toolbar';

import {AccountsListComponent} from '../accounts-list/accounts-list.component';
import {ToolbarComponent} from '../toolbar/toolbar.component';
import {ChatHomeComponent} from "../chat-home/chat-home.component";
import {ChatDiscussionComponent} from "../chat-discussion/chat-discussion.component";
import {ObservableUser} from "../../../core/observables/observable-user";
import {UserService} from "../../services/user.service";
import {ChatAddAccountComponent} from "../chat-add-account/chat-add-account.component";
import {DiscussionService} from "../../services/discussion.service";
import {ConnectionService} from "../../services/connection.service";

@Component({
  selector: "oc-account-view",
  templateUrl: "./components/chat/chat.component.html",
  styleUrls: ["./components/chat/chat.component.css"],
  directives: [
    MdCard,
    ROUTER_DIRECTIVES,
    // custom:
    AccountsListComponent,
    ToolbarComponent
  ],
  providers: []
})
@Routes([
  {path: '/', component: ChatHomeComponent},
  {path: '/add-account', component: ChatAddAccountComponent},
  {path: '/discussion', component: ChatDiscussionComponent}
])
export class ChatComponent implements OnInit {
  public user: ObservableUser;
  public title: string =  "Welcome you !";

  private _userService: UserService;

  constructor(userService: UserService) {
    this._userService = userService;
  }

  public ngOnInit(): void {
    this.user = this._userService.createUser("Test User");
    this._userService.setCurrentUser(this.user);
  }
}
