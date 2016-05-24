import {Component, OnInit} from '@angular/core';
import {MdCard} from '@angular2-material/card/card';
import {MdIcon} from '@angular2-material/icon/icon';
import {MdInput} from '@angular2-material/input/input';
import {MdList, MdListItem} from '@angular2-material/list/list';
import {DiscussionService} from "../../services/discussion.service";
import {ObservableDiscussion} from "../../../core/observables/observable-discussion";

@Component({
  selector: "oc-chat-discussion",
  templateUrl: "./components/chat-discussion/chat-discussion.component.html",
  styleUrls: ["./components/chat-discussion/chat-discussion.component.css"],
  directives: [MdCard, MdIcon, MdList, MdListItem, MdInput]
})
export class ChatDiscussionComponent implements OnInit {
  public discussion: ObservableDiscussion;
	public msg: string;

  private _discussionService: DiscussionService;

  constructor (discussionService: DiscussionService) {
    this._discussionService = discussionService;
  }

  public ngOnInit(): void {
    this._discussionService.currentDiscussion
      .subscribe((discussion: ObservableDiscussion) => {
        this.discussion = discussion;
      });
  }

	public sendMessage(): void {
		this.discussion.sendMessage({body: this.msg});
	}
}
