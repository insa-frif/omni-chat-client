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

	public onClick(): void
	{
		this.currentPic < this.pictures.length-1 ? this.currentPic++ : this.currentPic=0;
		console.log(this.currentPic);
		// TODO(Ruben) : remove console.log when clean
		// NB : On voit ici que le clique sur l'image est detecte, et que currentPic evolue correctement.
		//      Mais Angular ne met rien a jour.
	}

	constructor(private _sliderService: SliderService)
	{
		// Nothing to do here
	}
}