import * as Bluebird from "bluebird";

import {Location} from '@angular/common';
import {Component, Type} from '@angular/core';
import {Router, Routes, ROUTER_DIRECTIVES} from '@angular/router';
import {MdButton} from '@angular2-material/button/button';
import {MdIcon} from '@angular2-material/icon/icon';
import {MdList, MdListItem} from '@angular2-material/list/list';
import {MdSidenav, MdSidenavLayout} from '@angular2-material/sidenav/sidenav';
import {MdToolbar} from '@angular2-material/toolbar/toolbar';

import {AuthenticationFormComponent} from "../authentication-form/authentication-form.component";
import {HomeComponent} from '../home/home.component';
import {ChatComponent} from '../chat/chat.component';
import {RegistrationFormComponent} from '../registration-form/registration-form.component';
import {DiscussionService} from "../../services/discussion.service";
import {ConnectionService} from "../../services/connection.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: "oc-app",
  templateUrl: "./components/app/app.component.html",
  styleUrls: ["./components/app/app.component.css"],
  directives: [MdButton, MdIcon, MdList, MdListItem, MdSidenav, MdSidenavLayout, MdToolbar, ROUTER_DIRECTIVES],
  providers: [DiscussionService, ConnectionService, UserService]
})
@Routes([
  {path: '/', component: HomeComponent},
  {path: '/chat', component: ChatComponent},
  {path: '/authenticate', component: AuthenticationFormComponent},
	{path: '/register', component: RegistrationFormComponent}
])
export class AppComponent {
  title: string = "OmniChat";
  private _router: Router;
  private _location: Location;
  private _userService: UserService;

  constructor(router: Router, location: Location, userService: UserService) {
    this._router = router;
    this._location = location;
    this._userService = userService;
  }

  public ngOnInit(): void {
    Bluebird.resolve(this._userService.createUser("Test User"))
      .tap(user => user.init())
      .then((user) => {
        this._userService.setCurrentUser(user);
      });
  }
}
