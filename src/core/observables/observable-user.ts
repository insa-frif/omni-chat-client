import * as Bluebird from "bluebird";
import {interfaces} from "omni-chat";
import {BehaviorSubject} from 'rxjs';
import {ObservableUserAccount, wrapUserAccount} from "./observable-user-account";

export type LibUser = interfaces.User;
export type LibUserAccount = interfaces.UserAccount;

export class ObservableUser {
  name: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  accounts: BehaviorSubject<ObservableUserAccount[]> = new BehaviorSubject<ObservableUserAccount[]>([]);

  // public name: Observable<string> = this._name.asObservable();
  // public accounts: Observable<string> = this._accounts.asObservable();

  libUser: LibUser;

  constructor (libUser: LibUser) {
    this.libUser = libUser;
    this.load();
  }

  // force a reload
  load() {
    this.libUser.getName().then(name => this.name.next(name));
    this.loadAccounts();
  }

  // reload the accounts and update the view
  loadAccounts (): Bluebird<this> {
    return Bluebird.resolve(this.libUser.getAccounts())
      .map((userAccount: LibUserAccount) => {
        return wrapUserAccount(userAccount);
      })
      .then((accounts) => {
        this.accounts.next(accounts);
        return this;
      });
  }

	getAccounts(): Bluebird<ObservableUserAccount[]> {
		return Bluebird
			.resolve(this.libUser.getAccounts())
			.map((userAccount: interfaces.UserAccount) => {
				return wrapUserAccount(userAccount);
			});
	}

  addAccount (userAccount: ObservableUserAccount): Bluebird<this> {
    return Bluebird.resolve(this.libUser.addAccount(userAccount.libUserAccount))
      .then(() => {
        return this.loadAccounts()
      });
  }
}

// No id for the user (there is only one user for the moment :/)
let user: ObservableUser = null;
export function wrapUser (libUser: LibUser): ObservableUser {
  if (user === null) {
    user = new ObservableUser(libUser);
  }
  return user;
}
