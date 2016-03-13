/**
 * Created by Ruben on 28/02/2016.
 */

import {Injectable} from 'angular2/core';

@Injectable()
export class AccountService
// TODO : rename to follow Angular naming rules
{
  public loadContacts(username: string): Promise<Contact[]>
  {
    return this.loadContactsFromHard(username);
  }

  private loadContactsFromHard(username: string) : Promise<Contact[]>
  // TODO : remove this and update loadContacts when oc-library will be availlable
  {
    return Promise.resolve(userG.contacts);
  }
}

// TODO : replace the following by database access from oc-library
class User
{
  public username: string;
  public contacts: Contact[];
}

export class Contact
{
  public accounts: Account[];
  public username: string;
}

export class Account
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
    },
    {
      username: "Ruben",
      accounts: [
        {type: "fb"},
        {type: "skype"}
      ]
    },
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
	  },
	  {
		  username: "Ruben",
		  accounts: [
			  {type: "fb"},
			  {type: "skype"}
		  ]
	  }
  ]
}