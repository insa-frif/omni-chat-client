import {Component, OnInit, Type} from '@angular/core';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material/all";

import {OcContactListComponent} from '../oc-contacts-list/oc-contacts-list.component';
import {OcToolbarComponent} from '../oc-toolbar/oc-toolbar.component';
import {OcDiscussionsTabsComponent} from '../oc-discussions-tabs/oc-discussions-tabs.component';

@Component({
  selector: "oc-account-view",
  templateUrl: "./components/oc-account-view/oc-account-view.component.html",
  styleUrls: ["./components/oc-account-view/oc-account-view.component.css"],
  directives: [
    MATERIAL_DIRECTIVES,
    <Type>OcContactListComponent,
    <Type>OcToolbarComponent,
    <Type>OcDiscussionsTabsComponent
  ],
  providers: [MATERIAL_PROVIDERS]
})
export class OcAccountViewComponent implements OnInit
{
  public title: string =  "Welcome you !";
  private username: string;

  public ngOnInit(): void
  {
    this.username = "Joseph";
    // TODO(Ruben) : bind username
  }

  constructor()
  {
    // TODO : fill it when necessary
  }

}