import * as Bluebird from "bluebird";

import {Location} from '@angular/common';
import {Component, Type} from '@angular/core';
import {Router, Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';

import {AuthenticationFormComponent} from "../authentication-form/authentication-form.component";
import {HomeComponent} from '../home/home.component';
import {AccountComponent} from '../account/account.component';
import {RegistrationFormComponent} from '../registration-form/registration-form.component';

@Component({
  selector: "oc-app",
  templateUrl: "./components/app/app.component.html",
  styleUrls: ["./components/app/app.component.css"],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS]
})
@Routes([
  {path: '/account', component: AccountComponent},
  {path: '/authenticate', component: AuthenticationFormComponent},
  {path: '/home', component: HomeComponent},
	{path: '/register', component: RegistrationFormComponent}
])
export class AppComponent
{
  title: string = "OmniChat - Client";
  private _router: Router;
  private _location: Location;

  constructor(router: Router, location: Location) {
    this._router = router;
    this._location = location;
    console.log(location);
  }

  ngOnInit() {
    if (this._location.path() === "" || this._location.path() === "/") {
      this._router.navigate(['/home']);
    }
  }
}
