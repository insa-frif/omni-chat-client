/**
 * Created by Ruben on 25/02/2016.
 */

import {Component} from 'angular2/core';
import {Type} from 'angular2/core';
import {provide} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';

import {OcHomeComponent} from '../oc-home/oc-home.component';
import {OcAccountViewComponent} from '../oc-account-view/oc-account-view.component';

@Component({
	selector: "oc-app",
	templateUrl: "./components/oc-app/oc-app.component.html",
	styleUrls: ["./components/oc-app/oc-app.component.css"],
	directives: [ROUTER_DIRECTIVES],
	providers: [ROUTER_PROVIDERS]
})
@RouteConfig([
	{path: '/home', name: 'Home', component: <Type>OcHomeComponent, useAsDefault: true},
	{path: '/account', name: 'Account', component: <Type>OcAccountViewComponent}
	// TODO : /account/:username + ?
	// TODO : add a path to a sign up formular
])
export class OcAppComponent
// TODO : rename to follow Angular naming rules
{
	title: string = "OmniChat - Client";
}