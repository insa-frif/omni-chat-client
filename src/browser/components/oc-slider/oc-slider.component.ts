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
// TODO : rename to follow Angular naming rules
// TODO : add a link to each picture (example: git hub when explaining modules)
{
	public pictures: string[];
	public currentPic: number;
	public intervalID: any;

	public ngOnInit() : void
	{
		this.loadPictures()
			.then( () => {
				this.initInterval();
			}
			);
	}

	public loadPictures(): Promise<any>
	{
		return Promise
			.resolve(this._sliderService.loadPictures()
				.then( (pics: string[]) => {
					this.pictures = pics;
					this.currentPic = 0;
				} )
			);
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
			this.currentPic = (this.currentPic + this.pictures.length - 1) % this.pictures.length;
			clearInterval(this.intervalID);
			this.initInterval();
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