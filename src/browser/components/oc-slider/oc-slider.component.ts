/**
 * Created by Ruben on 24/02/2016.
 */

import {Component} from '../../../../node_modules/angular2/core.d';
import {OnInit} from '../../../../node_modules/angular2/core.d';
import {SliderService} from "../../services/oc-slider.service.ts";

@Component({
	selector: "slider",
	templateUrl: "./components/oc-slider.component.html",
	styleUrls: ["./components/oc-slider.component.css"],
	providers: [SliderService]
})
export class SliderComponent implements OnInit
{
	public title: string = "Mon slider";
	public pictures: string[];
	public currentPic: number;

	public ngOnInit() : void
	{
		//this.loadPictures();
		// TODO : faire fonctionner le tout avec la ligne au dessus a la place de celles en dessous
		this.pictures = [
			"../pictures/j1.jpg",
			"../pictures/j2.jpg"
		];
		this.currentPic = 1;
	}

	public loadPictures(): void
	{
		this._sliderService.loadPictures()
			.then( (pics: string[]) => {
				this.pictures = pics;
				this.currentPic = 0;
				console.log(this.currentPic);
				// TODO(Ruben) : remove console.log when clean
			} );
	}

	public nextPicture(): void
	{
    if(!this.pictures) {
      return;
    }
		this.currentPic = (this.currentPic + 1) % this.pictures.length;
		console.log(this.currentPic);
		// TODO(Ruben) : remove console.log when clean
	}

	constructor(private _sliderService: SliderService)
	{
		// Nothing to do here
	}
}