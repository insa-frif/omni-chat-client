import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";

@Injectable()
export class UserService {
  accounts: Observable<Account[]>;

  private _accounts: Account[] = [];
  private _accountsObserver: Observer<Account[]>;

  constructor () {
    this.init();
  }

  init() {
    this.accounts = Observable.create((observer: Observer<Account[]>) => this._accountsObserver = observer);
  }

  getAccounts(): Observable<Account[]> {
    return this.accounts;
  }
}

export interface Account {
  name: string;
  life: number;
}
