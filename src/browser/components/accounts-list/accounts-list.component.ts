import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {MdAnchor, MdButton} from '@angular2-material/button/button';
import {MdIcon} from '@angular2-material/icon/icon';
import {MdList, MdListItem} from '@angular2-material/list/list';

import {AccountService} from '../../services/oc-account.service';
import {Contact} from '../../services/oc-account.service';
import {Observable} from "rxjs/Observable";
import {UserService, UserAccount, ObservableUser} from "../../services/user.service";

@Component({
  selector: "oc-accounts-list",
  templateUrl: "./components/accounts-list/accounts-list.component.html",
  styleUrls: ["./components/accounts-list/accounts-list.component.css"],
  directives: [MdAnchor, MdButton, MdIcon, MdList, MdListItem, ROUTER_DIRECTIVES],
  providers: [AccountService, UserService]
})
export class AccountsListComponent implements OnInit {
  public title: string = "Accounts List";
  public contacts: Contact[];
	public selectedContact: Contact;
  public searchQuery: string;

  public user: ObservableUser;

  private _accountService: AccountService;
  private _userService: UserService;

  constructor(accountService: AccountService, userService: UserService) {
    this._accountService = accountService;
    this._userService = userService;
  }

  public ngOnInit(): void {
    this._userService.currentUser
      .subscribe((user: ObservableUser) => {
        this.user = user;
      });

    this._userService.resetCurrentUser();

    this.loadContacts();
  }

  public loadContacts(): void {
    this._accountService.loadContacts("Someone")
      .then((contacts: Contact[]) => {
        this.contacts = contacts;
      });
  }

	public sendEvent(): void {
		let myEvent = new CustomEvent(
			"discussionWanted",
			{
				detail : {
					contact: this.selectedContact,
					bubbles: true,
					cancelable: true
				}
			}
		);
		console.log("Event envoyé ! " + myEvent);
		window.document.getElementById("handleEventDiscussionWanted").dispatchEvent(myEvent);
	}

	public selectContact(c: Contact): void {
		this.selectedContact = c;
	}

  public hasMedia(breakSize: string): boolean {
    return false;
    // return Media.hasMedia(breakSize);
  }

  public addAccount(): void {
    if (this.user !== null) {
      this.user.loadAccounts();
    }
  }

  // public open(name: string) {
  //   this.sidenav.show(name);
  // }
  // public close(name: string) {
  //   this.sidenav.hide(name);
  // }


}
