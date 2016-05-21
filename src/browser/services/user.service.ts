import {Injectable, bind} from '@angular/core';
// import * as ocLib from "omni-chat";
import * as palantiri from "palantiri-interfaces";
import {Subject, BehaviorSubject} from 'rxjs';
import {UserModel} from '../models/user.model';
import {uuid} from "../../core/utils";

/**
 * UserService manages our current user
 */
@Injectable()
export class UserService {
  // `currentUser` contains the current user
  currentUser: Subject<ObservableUser> = new BehaviorSubject<ObservableUser>(null);

  public setCurrentUser (newUser: ObservableUser): void {
    this.currentUser.next(newUser);
  }

  public createUser (username: string) {
    // let ocLibUser = new ocLib.User(username);
    // console.log(ocLibUser);
    console.log(palantiri.Id.parseGlobal('["driver", "id"]'));
    this.setCurrentUser(new ObservableUser(username));
  }

  public addAccount (user: ObservableUser, account: any) {

  }

  public resetCurrentUser() {
    this.createUser("foo");
  }
}

export interface UserAccount {
  driver: string;
  name: string;
}

export class ObservableUser {
  username: Subject<string> = new BehaviorSubject<string>(null);
  accounts: Subject<UserAccount[]> = new BehaviorSubject<UserAccount[]>([]);

  ocLibUser: any; // ocLib.User;

  constructor (ochatUser: any) {
    this.ocLibUser = ochatUser;
  }

  loadAccounts () {
    this.accounts.next([
      {driver: "skype", name: "acc1"},
      {driver: "facebook", name: "acc1"}
    ]);
  }
}

// import {Injectable} from '@angular/core';
// import {Observable} from "rxjs/Observable";
// import {Observer} from "rxjs/Observer";
//
// @Injectable()
// export class UserService {
//   accounts: Observable<Account[]>;
//
//   private _accounts: Account[] = [];
//   private _accountsObserver: Observer<Account[]>;
//
//   constructor () {
//     this.init();
//   }
//
//   init() {
//     this.accounts = Observable.create((observer: Observer<Account[]>) => this._accountsObserver = observer);
//   }
//
//   getAccounts(): Observable<Account[]> {
//     return this.accounts;
//   }
// }
//
// export interface Account {
//   name: string;
//   life: number;
// }
