import {Component, OnInit} from '@angular/core';
import {MdCard} from '@angular2-material/card/card';
import {MdRadioButton, MdRadioGroup, MdRadioDispatcher} from '@angular2-material/radio/radio';

@Component({
  selector: "oc-chat-discussion",
  templateUrl: "./components/chat-add-account/chat-add-account.component.html",
  styleUrls: ["./components/chat-add-account/chat-add-account.component.css"],
  directives: [MdCard, MdRadioButton, MdRadioGroup],
  providers: [MdRadioDispatcher]
})
export class ChatAddAccountComponent implements OnInit {
  driverName: string;

  constructor () {}

  public ngOnInit(): void {}
}
