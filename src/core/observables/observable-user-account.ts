import {interfaces} from "omni-chat";
import * as Bluebird from "bluebird";
import * as palantiri from "palantiri-interfaces";
import {BehaviorSubject} from 'rxjs';

export type LibUserAccount = interfaces.UserAccount;

export class ObservableUserAccount {
  globalId: BehaviorSubject<palantiri.AccountGlobalId> = new BehaviorSubject<palantiri.AccountGlobalId>(null);
  driverName: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  name: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  contactAccounts: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  libUserAccount: LibUserAccount;

  constructor (libUserAccount: LibUserAccount) {
    this.libUserAccount = libUserAccount;
    this.load();
  }

  // force a reload
  load(): Bluebird<this> {
    return Bluebird.join(
      this.libUserAccount.getGlobalId(),
      // TODO
      // this.libUserAccount.getName(),
      // this.libUserAccount.getContactAccounts(),
      (id: string) => {
        let ref: palantiri.AccountReference = palantiri.Id.asReference(id);
        this.globalId.next(id);
        this.driverName.next(ref.driverName);
        this.name.next(`${ref.id}@${ref.driverName}`); // TODO, add getName to omni-chat
        this.contactAccounts.next([]); // TODO: accounts.map(wrapUserAccount)
        return this;
      }
    );
  }
}

let userAccounts: {[id: string]: ObservableUserAccount} = {};
export function wrapUserAccount (libUserAccount: LibUserAccount): ObservableUserAccount {
  let id: string = libUserAccount.getGlobalIdSync();
  if (!(id in userAccounts)) {
    userAccounts[id] = new ObservableUserAccount(libUserAccount);
  }
  return userAccounts[id];
}

export default ObservableUserAccount;
