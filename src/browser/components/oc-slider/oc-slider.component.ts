/**
 * Created by Ruben on 24/02/2016.
 */

import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {SliderService} from "../../services/oc-slider.service";

@Component({
	selector: "slider",
	templateUrl: "./components/oc-slider/oc-slider.component.html",
	styleUrls: ["./components/oc-slider/oc-slider.component.css"],
	providers: [SliderService]
})
export class SliderComponent implements OnInit
{
	public pictures: string[];
	public currentPic: number;
	public intervalID: any;

	public ngOnInit() : void
	{
		this.loadPictures();

	}

	public loadPictures(): void
	{
		this._sliderService.loadPictures()
			.then( (pics: string[]) => {
				this.pictures = pics;
				this.currentPic = 0;
				this.initInterval();
			} );
	}

	public nextPicture(): void
	{
	    if(this.pictures)
	    {
			this.currentPic = (this.currentPic + 1) % this.pictures.length;
			clearInterval(this.intervalID);
			this.initInterval();
	    }
	}

	public prevPicture(): void
	{
		if(this.pictures)
		{
			this.currentPic--;
			if(this.currentPic === -1)
			{
				this.currentPic = this.pictures.length-1;
			}
		}
	}

	public initInterval(): void
	{
		this.intervalID = setInterval(() => {this.nextPicture()}, 5000);
	}

	constructor(private _sliderService: SliderService)
	{
		// Nothing to do here
	}
}