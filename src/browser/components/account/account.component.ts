import {Component, OnInit, Type} from '@angular/core';

import {ContactsListComponent} from '../contacts-list/contacts-list.component';
import {ToolbarComponent} from '../toolbar/toolbar.component';
import {DiscussionsTabsComponent} from '../discussions-tabs/oc-discussions-tabs.component';

@Component({
  selector: "oc-account-view",
  templateUrl: "./components/account/account.component.html",
  styleUrls: ["./components/account/account.component.css"],
  directives: [
    ContactsListComponent,
    ToolbarComponent,
    DiscussionsTabsComponent
  ]
})
export class AccountComponent implements OnInit
{
  public title: string =  "Welcome you !";
  private username: string;

  public ngOnInit(): void
  {
    this.username = "USERNAME";
  }

  constructor() {}
}
