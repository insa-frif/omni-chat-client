/**
 * Created by Ruben on 06/03/2016.
 */

import {Component, OnInit} from 'angular2/core';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material/all';
import {Router} from 'angular2/router'

@Component({
	selector: "oc-connection-form",
	templateUrl: "./components/oc-connection-form/oc-connection-form.component.html",
	styleUrls: ["./components/oc-connection-form/oc-connection-form.component.css"],
	directives: [MATERIAL_DIRECTIVES],
	providers: [MATERIAL_PROVIDERS]
})
export class OcConnectionFormComponent implements OnInit
{
	private _connectionItems =
	{
		username: 'Your username',
		password: 'Your password',
		keep: true
	}

	public ngOnInit(): void
	{
		window.document.getElementById("connectButton").addEventListener(
			"click",
			() => { this._router.navigate(['Account']); },
			true);
		window.document.getElementById("toSignUp").addEventListener(
			"click",
			() => { this._router.navigate(['Registration']); },
			true);
	}

	constructor(private _router: Router)
	{
		// Nothing to do here
	}
}