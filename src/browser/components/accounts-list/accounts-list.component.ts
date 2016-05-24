import {Component, OnInit} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {MdAnchor, MdButton} from '@angular2-material/button/button';
import {MdIcon} from '@angular2-material/icon/icon';
import {MdList, MdListItem} from '@angular2-material/list/list';

import {UserService} from "../../services/user.service";
import {ObservableUser} from "../../../core/observables/observable-user";
import {ObservableUserAccount} from "../../../core/observables/observable-user-account";
import {ObservableDiscussion} from "../../../core/observables/observable-discussion";
import {DiscussionService} from "../../services/discussion.service";

@Component({
  selector: "oc-accounts-list",
  templateUrl: "./components/accounts-list/accounts-list.component.html",
  styleUrls: ["./components/accounts-list/accounts-list.component.css"],
  directives: [MdAnchor, MdButton, MdIcon, MdList, MdListItem, ROUTER_DIRECTIVES],
  providers: []
})
export class AccountsListComponent implements OnInit {
  public user: ObservableUser;

  private _router: Router;
  private _userService: UserService;
  private _discussionService: DiscussionService;

  constructor(router: Router, userService: UserService, discussionService: DiscussionService) {
    this._router = router;
    this._userService = userService;
    this._discussionService = discussionService;
  }

  public ngOnInit(): void {
    this._userService.currentUser
      .subscribe((user: ObservableUser) => {
        this.user = user;
      });
  }

  public openDiscussion(discussion: ObservableDiscussion, event: Event): void {
    console.log("opening discussion");
	  console.log(discussion.libDiscussion);
	  // (<SimpleDiscussion>discussion.libDiscussion).getUserAccountGlobalID()
		 //  .then((id:string) => {
			//   console.log(id);
		 //  });
	  // TODO: CEST QUOI CE BORDEL
    event.preventDefault();
    this._discussionService.setCurrentDiscussion(discussion);
    this._router.navigate(["chat/discussion"]);
  }

  public openDiscussionWithContact(userAccount: ObservableUserAccount, contactAccount: any): void {
    // TODO
    // this._discussionService.setCurrentDiscussion(...);
    // this._router.navigate(["chat/discussion"])
  }

  public addAccount(): void {
    if (this.user !== null) {
      this._router.navigate(["chat/add-account"]);
    }
  }

  // public open(name: string) {
  //   this.sidenav.show(name);
  // }
  // public close(name: string) {
  //   this.sidenav.hide(name);
  // }
}
