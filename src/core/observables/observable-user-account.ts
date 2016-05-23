import {interfaces} from "omni-chat";
import * as Bluebird from "bluebird";
import * as palantiri from "palantiri-interfaces";
import * as _ from "lodash";
import {BehaviorSubject} from 'rxjs';
import {wrapContactAccount, getContactAccount, ObservableContactAccount} from "./observable-contact-account";
import {ObservableDiscussion, getDiscussion} from "./observable-discussion";

export type LibUserAccount = interfaces.UserAccount;

export class ObservableUserAccount {
  protected _loaded: boolean = false;

  globalId: BehaviorSubject<palantiri.AccountGlobalId> = new BehaviorSubject<palantiri.AccountGlobalId>(null);
  driverName: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  name: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  contactAccounts: BehaviorSubject<ObservableContactAccount[]> = new BehaviorSubject<ObservableContactAccount[]>([]);
  discussions: BehaviorSubject<ObservableDiscussion[]> = new BehaviorSubject<ObservableDiscussion[]>([]);

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
    return Bluebird
      .all([
        this.loadContactAccounts(),
        this.loadDiscussions(),
        this.loadGlobalId(),
        this.loadName()
      ])
      .thenReturn(this);
  }

  loadContactAccounts(): Bluebird<ObservableContactAccount[]> {
    return Bluebird
      .try(() => {
        return this.libUserAccount.getContactAccounts();
      })
      .map(getContactAccount)
      .then((contactAccounts: ObservableContactAccount[]) => {
        this.contactAccounts.next(contactAccounts);
        return contactAccounts;
      });
  }

  getContactAccounts(): Bluebird<ObservableContactAccount[]> {
    return this.loadContactAccounts();
  }

  loadDiscussions(): Bluebird<ObservableDiscussion[]> {
    return Bluebird
      .try(() => {
        return this.libUserAccount.getDiscussions();
      })
      .map(getDiscussion)
      .then((discussions: ObservableDiscussion[]) => {
        this.discussions.next(discussions);
        return discussions;
      });
  }

  getDiscussions(): Bluebird<ObservableDiscussion[]> {
    return this.loadDiscussions();
  }

  loadGlobalId(): Bluebird<palantiri.AccountGlobalId> {
    return Bluebird
      .try(() => {
        return this.libUserAccount.getGlobalId();
      })
      .tap((globalId: palantiri.AccountGlobalId) => {
        this.globalId.next(globalId);
        return globalId;
      });
  }

  getGlobalId(): Bluebird<palantiri.AccountGlobalId> {
    return this.loadGlobalId();
  }

  loadName(): Bluebird<string> {
    return Bluebird
      .try(() => {
        return this.libUserAccount.getName();
      })
      .tap((name: string) => {
        this.name.next(name);
        return name;
      });
  }

  getName(): Bluebird<string> {
    return this.loadName();
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
