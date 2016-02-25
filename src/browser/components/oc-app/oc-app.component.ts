/**
 * Created by Ruben on 25/02/2016.
 */

import {Component} from 'angular2/core';
import {Type} from "angular2/core";

import {SliderComponent} from '../oc-slider/oc-slider.component';

@Component({
	selector: "oc-app",
	templateUrl: "./components/oc-app/oc-app.component.html",
	styleUrls: ["./components/oc-app/oc-app.component.css"],
	directives: [<Type>SliderComponent],
})
export class OcApp
{
	title: string = "Welcome you !";

	constructor()
	{
		// TODO(Ruben) : fill it when necessary
	}
}