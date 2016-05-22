import {interfaces} from "omni-chat";
import * as palantiri from "palantiri-interfaces";
import {Subject, BehaviorSubject} from 'rxjs';

export type LibUserAccount = interfaces.UserAccountInterface;

export class ObservableUserAccount {
  globalId: Subject<palantiri.AccountGlobalId> = new BehaviorSubject<palantiri.AccountGlobalId>(null);
  driver: Subject<string> = new BehaviorSubject<string>(null);
  name: Subject<string> = new BehaviorSubject<string>(null);
  contactAccounts: Subject<any[]> = new BehaviorSubject<any[]>([]);

  libUserAccount: LibUserAccount;

  constructor (libUserAccount: LibUserAccount) {
    this.libUserAccount = libUserAccount;
  }

  // force a reload
  load() {
    // TODO
    this.globalId.next(null);
    this.driver.next(null);
    this.name.next(null);
    this.contactAccounts.next(null);
  }
}

export default ObservableUserAccount;
