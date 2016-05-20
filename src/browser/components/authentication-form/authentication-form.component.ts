import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {MdButton} from '@angular2-material/button/button';
import {MdCard} from '@angular2-material/card/card';
import {MdCheckbox} from '@angular2-material/checkbox/checkbox';
import {MdInput} from '@angular2-material/input/input';
import {MdToolbar} from '@angular2-material/toolbar/toolbar';

@Component({
  selector: "oc-authentication-form",
  templateUrl: "./components/authentication-form/authentication-form.component.html",
  styleUrls: ["./components/authentication-form/authentication-form.component.css"],
  directives: [MdButton, MdCard, MdCheckbox, MdInput, MdToolbar, ROUTER_DIRECTIVES]
})
export class AuthenticationFormComponent implements OnInit {
  login: string = "";
  password: string = "";
  keep: boolean = false;

  constructor() {}

  public ngOnInit(): void {}

  public submit(event: Event) {
    console.log(event);
    event.preventDefault();
  }
}
