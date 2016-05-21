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
import {DiscussionsTabsComponent} from '../discussions-tabs/oc-discussions-tabs.component';
import {ChatHomeComponent} from "../chat-home/chat-home.component";
import {ChatDiscussionComponent} from "../chat-discussion/chat-discussion.component";

@Component({
  selector: "oc-account-view",
  templateUrl: "./components/chat/chat.component.html",
  styleUrls: ["./components/chat/chat.component.css"],
  directives: [
    MdCard,
    ROUTER_DIRECTIVES,
    // custom:
    AccountsListComponent,
    ToolbarComponent,
    DiscussionsTabsComponent
  ]
})
@Routes([
  {path: '/', component: ChatHomeComponent},
  {path: '/discussion', component: ChatDiscussionComponent}
])
export class ChatComponent implements OnInit
{
  public title: string =  "Welcome you !";
  private username: string;

  public ngOnInit(): void {
    this.username = "USERNAME";
  }

  constructor() {}
}
