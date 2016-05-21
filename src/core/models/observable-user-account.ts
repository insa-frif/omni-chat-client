import {UserAccount as LibUserAccount} from "omni-chat";
import * as palantiri from "palantiri-interfaces";
import {Subject, BehaviorSubject} from 'rxjs';

export class ObservableUserAccount {
  globalId: Subject<palantiri.AccountGlobalId> = new BehaviorSubject<palantiri.AccountGlobalId>(null);
  driver: Subject<string> = new BehaviorSubject<string>(null);
  name: Subject<string> = new BehaviorSubject<string>(null);
  contactAccounts: Subject<any[]> = new BehaviorSubject<any[]>([]);

  libUserAccount: LibUserAccount;

  constructor (libUserAccount: LibUserAccount) {
    this.libUserAccount = libUserAccount;
  }
}

export default ObservableUserAccount;
