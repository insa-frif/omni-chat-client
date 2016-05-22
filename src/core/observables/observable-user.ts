import * as Bluebird from "bluebird";
import {interfaces} from "omni-chat";
import {Subject, BehaviorSubject} from 'rxjs';
import {ObservableUserAccount} from "./observable-user-account";

export type LibUser = interfaces.UserInterface;
export type LibUserAccount = interfaces.UserAccountInterface;

export class ObservableUser {
  name: Subject<string> = new BehaviorSubject<string>(null);
  accounts: Subject<ObservableUserAccount[]> = new BehaviorSubject<ObservableUserAccount[]>([]);

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
    // this.libUser.getAccounts().map(account => observableAccount).then(accs => this.accounts.next(accs)) ...
    this.accounts.next([]); // TODO: remove this line and use the line above
    return Bluebird.resolve(this);
  }

  addAccount (userAccount: ObservableUserAccount): Bluebird<this> {
    return Bluebird.resolve(this.libUser /*this.libUser.addAccount(userAccount.libUserAccount)*/)
      .then(() => {
        // return this.loadAccounts()
        this.accounts.next([userAccount]); // TODO: remove this line and use the line above
        return this;
      })
  }
}
