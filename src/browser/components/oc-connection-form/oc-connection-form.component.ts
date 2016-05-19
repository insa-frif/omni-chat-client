import {Component, OnInit} from '@angular/core';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material/all';
import {Router} from '@angular/router';

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
		//$(".raisable").on('focus', () => {
		//	$(this).addClass('md-whiteframe-3dp');
		//})
	}

	constructor(private _router: Router)
	{
		// Nothing to do here
	}
}