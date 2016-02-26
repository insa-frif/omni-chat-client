/**
 * Created by Ruben on 25/02/2016.
 */

import {Component} from 'angular2/core';
import {Type} from 'angular2/core';
import {OnInit} from 'angular2/core';

import {SliderComponent} from '../oc-slider/oc-slider.component';

@Component({
	selector: "oc-app",
	templateUrl: "./components/oc-app/oc-app.component.html",
	styleUrls: ["./components/oc-app/oc-app.component.css"],
	directives: [<Type>SliderComponent],
})
export class OcApp implements OnInit
// TODO : rename to follow Angular naming rules
{
	title: string = "OmniChat - Client";

	public ngOnInit(): void
	{
		window.document.getElementById("connect").addEventListener(
			"click",
			() => { alert("Impossible to log in for the moment. Be patient !"); },
			true);
		window.document.getElementById("sign").addEventListener(
			"click",
			() => { alert("Impossible to sign in for the moment. Be patient !"); },
			true);
		// TODO (later) : use true methods when available from library
	}

	constructor()
	{
		// TODO(Ruben) : fill it when necessary
	}
}