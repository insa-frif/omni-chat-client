import {interfaces} from "omni-chat";
import * as Bluebird from "bluebird";
import * as palantiri from "palantiri-interfaces";
import {BehaviorSubject} from 'rxjs';

export type LibContactAccount = interfaces.ContactAccount;

export class ObservableContactAccount {
  globalId: BehaviorSubject<palantiri.AccountGlobalId> = new BehaviorSubject<palantiri.AccountGlobalId>(null);
  driverName: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  name: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  avatarUrl: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  libContactAccount: LibContactAccount;

  constructor (libContactAccount: LibContactAccount) {
    this.libContactAccount = libContactAccount;
    this.load();
  }

  // force a reload
  load(): Bluebird<this> {
    return Bluebird.reject(new Error("todo: observableContactAccount"));
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

export default ObservableContactAccount;
