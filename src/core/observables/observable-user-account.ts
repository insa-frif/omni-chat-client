import {interfaces} from "omni-chat";
import * as Bluebird from "bluebird";
import * as palantiri from "palantiri-interfaces";
import * as _ from "lodash";
import {BehaviorSubject} from 'rxjs';
import {wrapContactAccount} from "./observable-contact-account";

export type LibUserAccount = interfaces.UserAccount;

export class ObservableUserAccount {
  globalId: BehaviorSubject<palantiri.AccountGlobalId> = new BehaviorSubject<palantiri.AccountGlobalId>(null);
  driverName: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  name: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  contactAccounts: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  libUserAccount: LibUserAccount;

  constructor (libUserAccount: LibUserAccount) {
    this.libUserAccount = libUserAccount;
  }

  // force a reload
  load(): Bluebird<this> {
    console.log("Loading data for user");
    return Bluebird.join(
      this.libUserAccount.getGlobalId(),
      // TODO
      // this.libUserAccount.getName(),
      this.libUserAccount.getContactAccounts(),
      (id: string, contactAccounts: interfaces.ContactAccount[]) => {
        let ref: palantiri.AccountReference = palantiri.Id.asReference(id);
        this.globalId.next(id);
        this.driverName.next(ref.driverName);
        this.name.next(`${ref.id}@${ref.driverName}`); // TODO, add getName to omni-chat
        console.log("contacts:");
        console.log(contactAccounts);
        this.contactAccounts.next(_.map(contactAccounts, wrapContactAccount));
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
