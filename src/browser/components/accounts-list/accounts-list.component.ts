import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {MdAnchor, MdButton} from '@angular2-material/button/button';
import {MdIcon} from '@angular2-material/icon/icon';
import {MdList, MdListItem} from '@angular2-material/list/list';

import {AccountService} from '../../services/oc-account.service';
import {Contact} from '../../services/oc-account.service';

@Component({
  selector: "oc-accounts-list",
  templateUrl: "./components/accounts-list/accounts-list.component.html",
  styleUrls: ["./components/accounts-list/accounts-list.component.css"],
  directives: [MdAnchor, MdButton, MdIcon, MdList, MdListItem, ROUTER_DIRECTIVES],
  providers: [AccountService]
})
export class AccountsListComponent implements OnInit {
  public title: string = "Accounts List";
  public contacts: Contact[];
	public selectedContact: Contact;
  public searchQuery: string;

  private _accountService: AccountService;

  constructor(accountService: AccountService) {
    this._accountService = accountService;
  }

  public ngOnInit(): void {
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

  // public open(name: string) {
  //   this.sidenav.show(name);
  // }
  // public close(name: string) {
  //   this.sidenav.hide(name);
  // }


}
