import {User as LibUser} from "omni-chat";
import {Subject, BehaviorSubject} from 'rxjs';
import {ObservableUserAccount} from "./observable-user-account";

export class ObservableUser {
  name: Subject<string> = new BehaviorSubject<string>(null);
  accounts: Subject<ObservableUserAccount[]> = new BehaviorSubject<ObservableUserAccount[]>([]);

  // public name: Observable<string> = this._name.asObservable();
  // public accounts: Observable<string> = this._accounts.asObservable();

  libUser: LibUser;

  constructor (libUser: LibUser) {
    this.libUser = libUser;
    this.libUser.getName().then(name => this.name.next(name));
  }

  loadAccounts () {
    this.accounts.next([]);
  }
}
