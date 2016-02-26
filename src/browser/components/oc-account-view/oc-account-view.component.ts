/**
 * Created by Ruben on 26/02/2016.
 */

import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';

@Component({
	selector: "oc-account-view",
	templateUrl: "./components/oc-account-view/oc-account-view.component.html",
	styleUrls: ["./components/oc-account-view/oc-account-view.component.css"]
})
export class OcAccountViewComponent implements OnInit
{
	public title: string =  "Welcome you !";
	private username: string;

	public ngOnInit(): void
	{
		this.username = "Joseph";
		console.log(this.username);
		// TODO : bind username
	}

	constructor()
	{
		// TODO : fill it when necessary
	}
}