import {Component, OnInit} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {MdAnchor, MdButton} from '@angular2-material/button/button';
import {MdIcon} from '@angular2-material/icon/icon';
import {MdList, MdListItem} from '@angular2-material/list/list';

import {UserService} from "../../services/user.service";
import {ObservableUser} from "../../../core/models/observable-user";

@Component({
  selector: "oc-accounts-list",
  templateUrl: "./components/accounts-list/accounts-list.component.html",
  styleUrls: ["./components/accounts-list/accounts-list.component.css"],
  directives: [MdAnchor, MdButton, MdIcon, MdList, MdListItem, ROUTER_DIRECTIVES],
  providers: []
})
export class AccountsListComponent implements OnInit {
  public user: ObservableUser;

  private _router: Router;
  private _userService: UserService;


  constructor(router: Router, userService: UserService) {
    this._router = router;
    this._userService = userService;
  }

  public ngOnInit(): void {
    this._userService.currentUser
      .subscribe((user: ObservableUser) => {
        this.user = user;
      });

    // this.loadContacts();
  }

  // public loadContacts(): void {
  //   this._accountService.loadContacts("Someone")
  //     .then((contacts: Contact[]) => {
  //       this.contacts = contacts;
  //     });
  // }

  // public sendEvent(): void {
  //   let myEvent = new CustomEvent(
  //     "discussionWanted",
  //     {
  //       detail : {
  //         contact: this.selectedContact,
  //         bubbles: true,
  //         cancelable: true
  //       }
  //     }
  //   );
  //   console.log("Event envoyé ! " + myEvent);
  //   window.document.getElementById("handleEventDiscussionWanted").dispatchEvent(myEvent);
  // }

  // public selectContact(c: Contact): void {
  //   this.selectedContact = c;
  // }

  // public hasMedia(breakSize: string): boolean {
  //   return false;
  //   // return Media.hasMedia(breakSize);
  // }

  public addAccount(): void {
    if (this.user !== null) {
      this._router.navigate(["chat/add-account"]);
    }
  }

  // public open(name: string) {
  //   this.sidenav.show(name);
  // }
  // public close(name: string) {
  //   this.sidenav.hide(name);
  // }
}
