import {Injectable} from '@angular/core';

@Injectable()
export class SessionService {
  _user = {name: "Test user"};

  get user (): any {
    return this._user;
  }

  set user (user: any) {
    this._user = user;
  }
}
