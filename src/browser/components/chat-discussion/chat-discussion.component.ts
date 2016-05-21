import {Component, OnInit} from '@angular/core';
import {MdCard} from '@angular2-material/card/card';

@Component({
  selector: "oc-chat-discussion",
  templateUrl: "./components/chat-discussion/chat-discussion.component.html",
  styleUrls: ["./components/chat-discussion/chat-discussion.component.css"],
  directives: [MdCard]
})
export class ChatDiscussionComponent implements OnInit {
  constructor () {}

  public ngOnInit(): void {}
}
