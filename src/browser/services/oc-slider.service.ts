import {Injectable} from '@angular/core';


@Injectable()
export class SliderService
// TODO : rename to follow Angular naming rules
{
  public loadPictures(): Promise<string[]>
  {
    return this.loadPicFromHard();
  }

  private loadPicFromHard(): Promise<string[]>
  {
    let pics: string[] = [
      "../../pictures/j1.jpg",
      "../../pictures/j2.jpg"
    ];
    return Promise.resolve(pics);
  }
}