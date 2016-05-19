import {Component, Type} from '@angular/core';
import {Router, Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import {MATERIAL_DIRECTIVES, MATERIAL_BROWSER_PROVIDERS} from 'ng2-material/all';

import {OcHomeComponent} from '../oc-home/oc-home.component';
import {OcAccountViewComponent} from '../oc-account-view/oc-account-view.component';
import {OcConnectionFormComponent} from '../oc-connection-form/oc-connection-form.component';
import {OcRegistrationFormComponent} from '../oc-registration-form/oc-registration-form.component';

@Component({
  selector: "oc-app",
  templateUrl: "./components/oc-app/oc-app.component.html",
  styleUrls: ["./components/oc-app/oc-app.component.css"],
  directives: [ROUTER_DIRECTIVES, MATERIAL_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, MATERIAL_BROWSER_PROVIDERS]
})
@Routes([
  {path: '/home', component: <Type>OcHomeComponent},
  {path: '/account', component: <Type>OcAccountViewComponent},
  {path: '/connection', component: <Type>OcConnectionFormComponent},
	{path: '/registration', component: <Type>OcRegistrationFormComponent}
  // TODO : /account/:username + ?
  // TODO : add a path to a sign up formular
])
export class OcAppComponent
{
  title: string = "OmniChat - Client";
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit() {
    this.router.navigate(['/connection']);
  }
}