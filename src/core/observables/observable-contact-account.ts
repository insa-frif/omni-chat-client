import {interfaces} from "omni-chat";
import * as Bluebird from "bluebird";
import * as palantiri from "palantiri-interfaces";
import {BehaviorSubject} from 'rxjs';

export type LibContactAccount = interfaces.ContactAccount;

export class ObservableContactAccount {
  protected _loaded: boolean = false;

  globalId: BehaviorSubject<palantiri.AccountGlobalId> = new BehaviorSubject<palantiri.AccountGlobalId>(null);
  driverName: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  name: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  avatarUrl: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  libContactAccount: LibContactAccount;

  constructor (libContactAccount: LibContactAccount) {
    console.log("Created observable user account");
    this.libContactAccount = libContactAccount;
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
    return Bluebird.resolve(this.libContactAccount.getName())
      .then((name: string) => {
        this.name.next(name);
      })
      .thenReturn(this);
  }
}

let contactAccounts: {[id: string]: ObservableContactAccount} = {};
export function wrapContactAccount (libContactAccount: LibContactAccount): ObservableContactAccount {
  let id: string = libContactAccount.getGlobalIdSync();
  if (!(id in contactAccounts)) {
    contactAccounts[id] = new ObservableContactAccount(libContactAccount);
  }
  return contactAccounts[id];
}

export function getContactAccount (libContactAccount: LibContactAccount): Bluebird<ObservableContactAccount> {
  return wrapContactAccount(libContactAccount).init();
}

export default ObservableContactAccount;
