/**
 * Created by Ruben on 24/02/2016.
 */

import {Component} from '../../../node_modules/angular2/core.d';

@Component({
	selector: "slider",
	templateUrl: "./slider.component.html",
	styleUrls: ["./slider.component.css"]
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