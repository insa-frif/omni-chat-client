/**
 * Created by Ruben on 28/02/2016.
 */

import {Injectable} from 'angular2/core';

@Injectable()
export class AccountService
// TODO : rename to follow Angular naming rules
{
	public loadContacts(user: User): Contact[]
	{
		return this.loadContactsFromHard(user);
	}

	private loadContactsFromHard(user: User)
	// TODO : remove this and update loadContacts when oc-library will be availlable
	{
		user = userG;
		return user.contacts;
	}
}

// TODO : replace the following by database access from oc-library
class User
{
	public username: string;
	public contacts: Contact[];
}

class Contact
{
	public username: string;
	public accounts: Account[];
}

class Account
{
	public type: string;
}

let userG: User = {
	username: "Ruben",
	contacts: [
		{
			username: "Charles",
			accounts: [
				{type: "fb"},
				{type: "irc"},
				{type: "xmpp"}
			]
		},
		{
			username: "Nicolas",
			accounts: [
				{type: "fb"},
				{type: "irc"}
			]
		},
		{
			username: "Alan",
			accounts: [
				{type: "fb"},
				{type: "xmpp"}
			]
		}
	]
}