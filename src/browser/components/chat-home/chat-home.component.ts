import {Component, OnInit} from '@angular/core';
import {MdCard} from '@angular2-material/card/card';

@Component({
  selector: "oc-chat-home",
  templateUrl: "./components/chat-home/chat-home.component.html",
  styleUrls: ["./components/chat-home/chat-home.component.css"],
  directives: [MdCard]
})
export class ChatHomeComponent implements OnInit {
  constructor () {}

  public ngOnInit(): void {}
}
