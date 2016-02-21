import {Component, NgZone} from 'angular2/core';

export interface Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'tuto-app',
  templateUrl: './components/tuto-app/tuto-app.html',
  styleUrls: ['./components/tuto-app/tuto-app.css']
})
export class TutoApp {
  public title = 'Tour of Heroes';
  public hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
}
