import {interfaces} from "omni-chat";
import * as Bluebird from "bluebird";
import * as palantiri from "palantiri-interfaces";
import * as _ from "lodash";
import {BehaviorSubject} from 'rxjs';
import {wrapContactAccount, getContactAccount, ObservableContactAccount} from "./observable-contact-account";

export type LibUserAccount = interfaces.UserAccount;

export class ObservableUserAccount {
  protected _loaded: boolean = false;

  globalId: BehaviorSubject<palantiri.AccountGlobalId> = new BehaviorSubject<palantiri.AccountGlobalId>(null);
  driverName: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  name: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  contactAccounts: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  libUserAccount: LibUserAccount;

  constructor (libUserAccount: LibUserAccount) {
    this.libUserAccount = libUserAccount;
  }

  init(): Bluebird<this> {
    if (this._loaded) {
      return Bluebird.resolve(this);
    } else {
      return this.load();
    }
  }

  // force a reload
  load(): Bluebird<this> {
    this._loaded = true;

    console.log("Loading data for user-account");
    return Bluebird.join(
      this.libUserAccount.getGlobalId(),
      this.libUserAccount.getName(),
      Bluebird.resolve(this.libUserAccount.getContactAccounts()).map(getContactAccount),
      (id: string, name: string, contactAccounts: ObservableContactAccount[]) => {
        let ref: palantiri.AccountReference = palantiri.Id.asReference(id);
        this.globalId.next(id);
        this.driverName.next(ref.driverName);
        this.name.next(name);
        this.contactAccounts.next(contactAccounts);
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

export function getUserAccount (libUserAccount: LibUserAccount): Bluebird<ObservableUserAccount> {
  return wrapUserAccount(libUserAccount).init();
}

export default ObservableUserAccount;
