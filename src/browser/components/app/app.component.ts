import * as Bluebird from "bluebird";

import {Location} from '@angular/common';
import {Component, Type} from '@angular/core';
import {Router, Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';

import {HomeComponent} from '../home/home.component';
import {OcAccountViewComponent} from '../oc-account-view/oc-account-view.component';
import {OcConnectionFormComponent} from '../oc-connection-form/oc-connection-form.component';
import {RegistrationFormComponent} from '../registration-form/registration-form.component';

@Component({
  selector: "oc-app",
  templateUrl: "./components/app/app.component.html",
  styleUrls: ["./components/app/app.component.css"],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS]
})
@Routes([
  {path: '/home', component: HomeComponent},
  // {path: '/account', component: <Type>OcAccountViewComponent},
  // {path: '/connection', component: <Type>OcConnectionFormComponent},
	{path: '/register', component: RegistrationFormComponent}
  // TODO : /account/:username + ?
  // TODO : add a path to a sign up formular
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
