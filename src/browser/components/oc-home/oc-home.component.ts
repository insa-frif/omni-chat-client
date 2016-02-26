/**
 * Created by Ruben on 26/02/2016.
 */

import {Component} from 'angular2/core';
import {Type} from 'angular2/core';
import {OnInit} from 'angular2/core';

import {SliderComponent} from '../oc-slider/oc-slider.component';

@Component({
	selector: "oc-home",
	templateUrl: "./components/oc-home/oc-home.component.html",
	styleUrls: ["./components/oc-home/oc-home.component.css"],
	directives: [<Type>SliderComponent]
})
export class OcHomeComponent implements OnInit
{
	title: string = "OmniChat - A chat to rule them all";

	public ngOnInit(): void
	{
		window.document.getElementById("connect").addEventListener(
			"click",
			() => { alert("Impossible to sign in for the moment. Be patient !"); },
			true);
		window.document.getElementById("sign").addEventListener(
			"click",
			() => { alert("Impossible to sign up for the moment. Be patient !"); },
			true);
		// TODO (later) : use true methods when available from library
	}

	constructor()
	{
		// TODO(Ruben) : fill it when necessary
	}
}