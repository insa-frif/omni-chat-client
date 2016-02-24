/**
 * Created by Ruben on 24/02/2016.
 */

import {Injectable} from 'angular2/core';


@Injectable()
export class SliderService
{
	public loadPictures(): Promise<string[]>
	{
		return this.loadPicFromHard();
	}

	private loadPicFromHard(): Promise<string[]>
	{
		let pics: string[] = [
			"../pictures/j1.jpg",
			"../pictures/j2.jpg"
		];
		return Promise.resolve(pics);
	}
}