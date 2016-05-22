import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MdButton} from '@angular2-material/button/button';
import {MdCard} from '@angular2-material/card/card';
import {MdInput} from '@angular2-material/input/input';
import {MdRadioButton, MdRadioGroup, MdRadioDispatcher} from '@angular2-material/radio/radio';
import * as Bluebird from "bluebird";

import {UserService} from "../../services/user.service";
import {ObservableUser} from "../../../core/observables/observable-user";
import {ObservableUserAccount} from "../../../core/observables/observable-user-account";
import {ConnectionService} from "../../services/connection.service";
import {FacebookOptions, SkypeOptions} from "../../../core/drivers";

@Component({
  selector: "oc-chat-discussion",
  templateUrl: "./components/chat-add-account/chat-add-account.component.html",
  styleUrls: ["./components/chat-add-account/chat-add-account.component.css"],
  directives: [MdButton, MdCard, MdInput, MdRadioButton, MdRadioGroup],
  providers: [MdRadioDispatcher]
})
export class ChatAddAccountComponent implements OnInit {
  driverName: string;
  facebookEmail: string;
  facebookPassword: string;
  skypeUsername: string;
  skypePassword: string;
  errorMessage: string = null;
  user: ObservableUser = null;

  private _router: Router;
  private _userService: UserService;
  private _connectionService: ConnectionService;

  constructor(router: Router, userService: UserService, connectionService: ConnectionService) { // ConnectionService
    this._router = router;
    this._userService = userService;
    this._connectionService = connectionService;
  }

  public ngOnInit(): void {
    this._userService.currentUser
      .subscribe((user: ObservableUser) => {
        this.user = user;
      });
  }

  public onSubmit(ev: Event) {
    ev.preventDefault();

    if (this.user === null) {
      this.errorMessage = "No active user";
      return;
    }

    let userAccountPromise: Bluebird<ObservableUserAccount>;

    switch (this.driverName) {
      case "facebook": {
        let options: FacebookOptions = {
          credentials: {
            email: this.facebookEmail || "",
            password: this.facebookPassword || ""
          }
        };
        userAccountPromise = this._connectionService.getNewFacebookAccount(options);
        break;
      }
      case "skype": {
        let options: SkypeOptions = {
          credentials: {
            username: this.skypeUsername || "",
            password: this.skypePassword || ""
          }
        };
        userAccountPromise = this._connectionService.getNewSkypeAccount(options);
        break;
      }
      default:
        this.errorMessage = "You have to choose a driverName";
        return;
    }

    // TODO: set pending state during verification of account
    console.log("Adding an account...");

    userAccountPromise
      .then((userAccount: ObservableUserAccount) => {
        this.user.addAccount(userAccount);
        // .then ?
        console.log("Successfully added account");
      })
      .catch((error: Error) => {
        console.log("Error while adding account");
        this.errorMessage = error.message;
      });
  }
}
