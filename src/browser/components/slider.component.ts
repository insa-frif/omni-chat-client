/**
 * Created by Ruben on 24/02/2016.
 */

import {Component} from 'angular2/core';

@Component({
	selector: "slider",
	templateUrl: "./components/slider.component.html",
	styleUrls: ["./components/slider.component.css"]
})
export class SliderComponent
{
	public title: string = "Mon slider";
	public pictures: string[];

	public loadPictures(): void
	{
		// TODO(Ruben) : fill it
	}

	constructor()
	{
		// TODO(Ruben) : fill it
	}
}