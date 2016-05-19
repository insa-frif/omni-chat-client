import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {MdButton} from '@angular2-material/button/button';
import {MdCard} from '@angular2-material/card/card';
import {MdInput} from '@angular2-material/input/input';
import {MdToolbar} from '@angular2-material/toolbar/toolbar';

@Component({
  selector: "oc-connection-form",
  templateUrl: "./components/registration-form/registration-form.component.html",
  styleUrls: ["./components/registration-form/registration-form.component.css"],
  directives: [MdButton, MdCard, MdInput, MdToolbar, ROUTER_DIRECTIVES]
})
export class RegistrationFormComponent implements OnInit {
  login: string = "";
  password: string = "";

  constructor() {}

  public ngOnInit(): void {}

  public submit(event: Event) {
    console.log(arguments);
  }
}
