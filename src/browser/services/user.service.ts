import {Injectable} from '@angular/core';
import {User as LibUser} from "omni-chat";
import {Subject, BehaviorSubject} from 'rxjs';

import {ObservableUser} from "../../core/observables/observable-user";
import {ObservableUserAccount} from "../../core/observables/observable-user-account";

@Injectable()
export class UserService {
  currentUser: Subject<ObservableUser> = new BehaviorSubject<ObservableUser>(null);

  public setCurrentUser (newUser: ObservableUser): void {
    this.currentUser.next(newUser);
  }

  public createUser (username: string): ObservableUser {
    return new ObservableUser(new LibUser(username));
  }

  public addAccount (user: ObservableUser, account: ObservableUserAccount) {}
}
