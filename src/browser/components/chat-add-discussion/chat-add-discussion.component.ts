import {Component, OnInit} from '@angular/core';
import {MdCard} from '@angular2-material/card/card';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {MdList, MdListItem} from '@angular2-material/list/list';
import {DiscussionService} from "../../services/discussion.service";
import {ObservableDiscussion} from "../../../core/observables/observable-discussion";
import {ObservableUser} from "../../../core/observables/observable-user";
import {MdButton} from '@angular2-material/button/button';
import {UserService} from "../../services/user.service";
import {MdCheckbox} from "@angular2-material/checkbox/checkbox";

@Component({
  selector: "oc-chat-add-discussion",
  templateUrl: "./components/chat-add-discussion/chat-add-discussion.component.html",
  styleUrls: ["./components/chat-add-discussion/chat-add-discussion.component.css"],
	directives: [MdCard, MdButton, MdList, MdListItem, MdCheckbox, ROUTER_DIRECTIVES],
})
export class ChatAddDiscussionComponent implements OnInit {
  public discussion: ObservableDiscussion;
	public user: ObservableUser;

  private _discussionService: DiscussionService;
	private _userService: UserService;

  constructor (discussionService: DiscussionService, userService: UserService) {
    this._discussionService = discussionService;
	  this._userService = userService;
  }

  public ngOnInit(): void {
    this._discussionService.currentDiscussion
      .subscribe((discussion: ObservableDiscussion) => {
        this.discussion = discussion;
      });
	  this._userService.currentUser
		  .subscribe((user: ObservableUser) => {
			  this.user = user;
		  });
  }
}
