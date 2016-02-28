/**
 * Created by Ruben on 28/02/2016.
 */

import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';

import {AccountService} from '../../services/oc-account.service';
import {Contact} from '../../services/oc-account.service';

@Component({
	selector: "oc-contact-list",
	templateUrl: "./components/oc-contacts-list/oc-contacts-list.component.html",
	styleUrls: ["./components/oc-contacts-list/oc-contacts-list.component.css"],
	providers: [AccountService]
})
export class OcContactListComponent implements OnInit
// TODO : rename to follow Angular naming rules
// TODO : from where do we get the username ("Someone") ? Maybe we should adapt oc-account-view
{
	public title: string = "Contact List";
	public contacts: Contact[];

	public loadContacts(): void
	{
		this._accountService.loadContacts("Someone")
			.then( (contacts: Contact[]) => {
				this.contacts = contacts;
			});
	}

	public ngOnInit(): void
	{
		this.loadContacts();
	}

	constructor(private _accountService: AccountService)
	{
		// Nothing to do here
	}
}