import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {MdButton} from '@angular2-material/button/button';
import {MdList, MdListItem} from '@angular2-material/list/list';
import {MdSidenav, MdSidenavLayout} from '@angular2-material/sidenav/sidenav';
import {MdToolbar} from '@angular2-material/toolbar/toolbar';

import {AccountService} from '../../services/oc-account.service';
import {Contact} from '../../services/oc-account.service';

@Component({
  selector: "oc-contacts-list",
  templateUrl: "./components/contacts-list/contacts-list.component.html",
  styleUrls: ["./components/contacts-list/contacts-list.component.css"],
  directives: [MdSidenav, MdSidenavLayout],
  providers: [AccountService]
})
export class ContactsListComponent implements OnInit {
  public title: string = "Contact List";
  public contacts: Contact[];
	public selectedContact: Contact;
  public searchQuery: string = "";

  private _accountService: AccountService;

  constructor(accountService: AccountService) {
    this._accountService = accountService;
  }

  public loadContacts(): void {
    this._accountService.loadContacts("Someone")
      .then( (contacts: Contact[]) => {
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

  public ngOnInit(): void {
    this.loadContacts();
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
