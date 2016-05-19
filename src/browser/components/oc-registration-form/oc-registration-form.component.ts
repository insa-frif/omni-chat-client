/**
 * Created by Ruben on 06/03/2016.
 */

import {Component, OnInit} from '@angular/core';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material/all';
import {Router} from '@angular/router'

@Component({
	selector: "oc-connection-form",
	templateUrl: "./components/oc-registration-form/oc-registration-form.component.html",
	styleUrls: ["./components/oc-registration-form/oc-registration-form.component.css"],
	directives: [MATERIAL_DIRECTIVES],
	providers: [MATERIAL_PROVIDERS]
})
export class OcRegistrationFormComponent implements OnInit
{
	private _registrationItems =
	{
		username: 'Your username',
		password: 'Your password',
		mailAddress: 'Your mail address',
	}

	public ngOnInit(): void
	{
		window.document.getElementById("registerButton").addEventListener(
			"click",
			() => { alert("Impossible to sign up for the moment. Be patient !") },
			true);
		window.document.getElementById("toSignIn").addEventListener(
			"click",
			() => { this._router.navigate(['Connection']); },
			true);
	}

	constructor(private _router: Router)
	{
		// Nothing to do here
	}
}