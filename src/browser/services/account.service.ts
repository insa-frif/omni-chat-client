// import {Injectable} from '@angular/core';
// import {Observable} from "rxjs/Observable";
// import {Observer} from "rxjs/Observer";
//
// @Injectable()
// export class AccountService {
//   accounts: Observable<Account[]>;
//   private _username: string;
//
//   get username (): Observable<string> {
//     return Observable
//   }
//   life: Observable<number>;
//
//   constructor () {
//     this.init();
//   }
//
//   init() {
//     this.accounts = Observable.create((observer: Observer<Account[]>) => {
//       let accounts: Account[] = [];
//       let id = 0;
//       observer.next(accounts);
//       setInterval(() => {
//         accounts.push({
//           name: "acc" + (id++),
//           life: 0
//         });
//         for(let acc of accounts) {
//           acc.life ++;
//         }
//         observer.next(accounts);
//       }, 2000);
//       // observer.complete();
//       // console.log("gotAccounts");
//       // return () => {
//       //   console.log('disposed');
//       // }
//     });
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
