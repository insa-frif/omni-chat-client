/**
 * Created by Ruben on 28/02/2016.
 */

import {Component, OnInit} from 'angular2/core';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS, Media, SidenavService} from "ng2-material/all";

import {AccountService} from '../../services/oc-account.service';
import {Contact} from '../../services/oc-account.service';

@Component({
  selector: "oc-contact-list",
  templateUrl: "./components/oc-contacts-list/oc-contacts-list.component.html",
  styleUrls: ["./components/oc-contacts-list/oc-contacts-list.component.css"],
  directives: [MATERIAL_DIRECTIVES],
  providers: [
    AccountService,
    MATERIAL_PROVIDERS,
    SidenavService
  ]
})
export class OcContactListComponent implements OnInit
// TODO : rename to follow Angular naming rules
// TODO : from where do we get the username ("Someone") ? Maybe we should adapt oc-account-view
{
  public title: string = "Contact List";
  public contacts: Contact[];
	public selectedContact: Contact;

  public loadContacts(): void
  {
    this._accountService.loadContacts("Someone")
      .then( (contacts: Contact[]) => {
        this.contacts = contacts;
      });
  }

	public selectContact(c: Contact): void
	{
		this.selectedContact = c;
	}

  public ngOnInit(): void
  {
    this.loadContacts();
  }

  public hasMedia(breakSize: string): boolean {
    return Media.hasMedia(breakSize);
  }
  public open(name: string) {
    this.sidenav.show(name);
  }
  public close(name: string) {
    this.sidenav.hide(name);
  }

  constructor(
    private _accountService: AccountService,
    public sidenav: SidenavService)
  {
    // Nothing to do here
  }
}