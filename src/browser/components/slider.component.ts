/**
 * Created by Ruben on 24/02/2016.
 */

import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {SliderService} from "../services/slider.service";

@Component({
	selector: "slider",
	templateUrl: "./components/slider.component.html",
	styleUrls: ["./components/slider.component.css"],
	providers: [SliderService]
})
export class SliderComponent implements OnInit
{
	public title: string = "Mon slider";
	public pictures: string[];

	public ngOnInit() : void
	{
		this.loadPictures();
	}

	public loadPictures(): void
	{
		this._sliderService.loadPictures()
			.then( (pics: string[]) => this.pictures = pics );
	}

	constructor(private _sliderService: SliderService)
	{
		// Nothing to do here
	}
}