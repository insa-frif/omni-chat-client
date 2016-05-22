import {Injectable} from '@angular/core';
import {skypeDriver, SkypeOptions, facebookDriver, FacebookOptions} from "../palantiri-proxy/drivers";
import {ObservableUserAccount, wrapUserAccount} from "../../core/observables/observable-user-account";
import * as Bluebird from "bluebird";
import * as palantiri from "palantiri-interfaces";
import {driversStore, UserAccount as LibUserAccount} from "omni-chat";

@Injectable()
export class ConnectionService {
  /**
   * This will try to establish a connection to the account and if so return the account
   * @param options
   */
  public getNewFacebookAccount (options: FacebookOptions): Bluebird<ObservableUserAccount> {
    let connection = new facebookDriver(options);
    return Bluebird.resolve(connection.connect())
      .then((api: palantiri.Api) => {
        return api.getCurrentUser();
      })
      .then((palantiriAccount: palantiri.Account) => {
        return new LibUserAccount(palantiriAccount);
      })
      .tap((libUserAccount: LibUserAccount) => {
        return driversStore.addActiveConnection(libUserAccount, connection);
      })
      .then((libUserAccount: LibUserAccount) => {
        return wrapUserAccount(libUserAccount);
      });
  }

  public getNewSkypeAccount (options: SkypeOptions): Bluebird<ObservableUserAccount> {
    let connection = new skypeDriver(options);
    return Bluebird.resolve(connection.connect())
      .then((api: palantiri.Api) => {
        return api.getCurrentUser();
      })
      .then((palantiriAccount: palantiri.Account) => {
        return new LibUserAccount(palantiriAccount);
      })
      .tap((libUserAccount: LibUserAccount) => {
        return driversStore.addActiveConnection(libUserAccount, connection);
      })
      .then((libUserAccount: LibUserAccount) => {
        return wrapUserAccount(libUserAccount);
      });
  }
}
