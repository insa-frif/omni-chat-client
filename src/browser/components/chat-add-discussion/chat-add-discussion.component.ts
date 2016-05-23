import * as Bluebird from "bluebird";
import * as _ from "lodash";
import {interfaces} from "omni-chat";
import {Component, OnInit} from '@angular/core';
import {MdCard} from '@angular2-material/card/card';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {MdList, MdListItem} from '@angular2-material/list/list';
import {DiscussionService} from "../../services/discussion.service";
import {ObservableDiscussion} from "../../../core/observables/observable-discussion";
import {ObservableContactAccount} from "../../../core/observables/observable-contact-account";
import {ObservableUser} from "../../../core/observables/observable-user";
import {MdButton} from '@angular2-material/button/button';
import {UserService} from "../../services/user.service";
import {MdCheckbox} from "@angular2-material/checkbox/checkbox";
import {wrapDiscussion} from "../../../core/observables/observable-discussion";

@Component({
  selector: "oc-chat-add-discussion",
  templateUrl: "./components/chat-add-discussion/chat-add-discussion.component.html",
  styleUrls: ["./components/chat-add-discussion/chat-add-discussion.component.css"],
	directives: [MdCard, MdButton, MdList, MdListItem, MdCheckbox, ROUTER_DIRECTIVES],
})
export class ChatAddDiscussionComponent implements OnInit {
  public discussion: ObservableDiscussion;
	public user: ObservableUser;
	public participants: interfaces.ContactAccount[] = [];

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

	public onChange(contact: ObservableContactAccount, event: boolean): void {
		if(event) {
			this.participants.push(contact.libContactAccount);
			console.log(this.participants +" added from participants");
		} else {
			this.participants.splice(this.participants.indexOf(contact.libContactAccount), 1);
			console.log(this.participants +" removed from participants");
		}
		console.log(this.participants);
	}

	public createDiscussion(): void {
		// TODO: freeze things so there won't be any problems while adding the discussion
		// TODO: let the user know that everything is going well by adding a progress-circle
		Bluebird.try(() => {
			console.log("Creating discussion with: ");
			console.log(this.participants);
			this.user.libUser.getOrCreateDiscussion(this.participants)
				.then((discussion: interfaces.Discussion) => {
					console.log("Discussion created");
					this._discussionService.setCurrentDiscussion(wrapDiscussion(discussion));
					console.log("Discussion set as the current discussion");
				});
		});
	}
}
