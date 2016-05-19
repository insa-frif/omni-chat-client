import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material/all';

@Component({
	selector: "oc-home-upperband",
	templateUrl: "./components/oc-home-upperband/oc-home-upperband.component.html",
	styleUrls: ["./components/oc-home-upperband/oc-home-upperband.component.css"],
	directives: [
		MATERIAL_DIRECTIVES
	],
	providers: [MATERIAL_PROVIDERS]
})
export class OcHomeUpperbandComponent implements OnInit {

	public keepLoggedBox = true;

	public ngOnInit(): void {
		window.document.getElementById("connect").addEventListener(
			"click",
			() => { this._router.navigate(['Connection']); },
			true);
		// TODO : use the formular and check for an existant account or not before connecting
		window.document.getElementById("sign").addEventListener(
			"click",
			() => { this._router.navigate(['Registration']); },
			true);
	}

	constructor(private _router: Router) {
		// Nothing to do here
	}
}