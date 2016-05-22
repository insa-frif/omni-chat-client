import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MdCard} from '@angular2-material/card/card';
import {MdRadioButton, MdRadioGroup, MdRadioDispatcher} from '@angular2-material/radio/radio';
import {UserService} from "../../services/user.service";
import {ObservableUser} from "../../../core/observables/observable-user";
import {ObservableUserAccount} from "../../../core/observables/observable-user-account";

@Component({
  selector: "oc-chat-discussion",
  templateUrl: "./components/chat-add-account/chat-add-account.component.html",
  styleUrls: ["./components/chat-add-account/chat-add-account.component.css"],
  directives: [MdCard, MdRadioButton, MdRadioGroup],
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


  constructor(router: Router, userService: UserService) { // ConnectionService
    this._router = router;
    this._userService = userService;
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

    switch (this.driverName) {
      case "facebook":
        break;
      case "skype":
        break;
      default:
        this.errorMessage = "You have to choose a driver";
        return;
    }

    // This function should retrieve the connection, establish a link, get the palantiri data, create an ocLib account and then create an ObservableUserAccount

    console.log("Adding an account...");

    this.user.addAccount(new ObservableUserAccount(null)); // null should be an ocLib userAccount
  }
}
