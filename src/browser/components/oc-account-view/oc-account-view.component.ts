/**
 * Created by Ruben on 26/02/2016.
 */

import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';

import {OcContactListComponent} from '../oc-contacts-list/oc-contacts-list.component';
import {OcToolbarComponent} from '../oc-toolbar/oc-toolbar.component';

@Component({
	selector: "oc-account-view",
	templateUrl: "./components/oc-account-view/oc-account-view.component.html",
	styleUrls: ["./components/oc-account-view/oc-account-view.component.css"],
	directives: [
		OcContactListComponent,
		OcToolbarComponent
	]
})
export class OcAccountViewComponent implements OnInit
{
	public title: string =  "Welcome you !";
	private username: string;

	public ngOnInit(): void
	{
		this.username = "Joseph";
		// TODO(Ruben) : bind username
	}

	constructor()
	{
		// TODO : fill it when necessary
	}
}