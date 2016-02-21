import {Component, NgZone} from 'angular2/core';

export interface Hero {
  id: number;
  name: string;
}

let HEROES: Hero[] = [
  { "id": 11, "name": "Mr. Nice" },
  { "id": 12, "name": "Narco" },
  { "id": 13, "name": "Bombasto" },
  { "id": 14, "name": "Celeritas" },
  { "id": 15, "name": "Magneta" },
  { "id": 16, "name": "RubberMan" },
  { "id": 17, "name": "Dynama" },
  { "id": 18, "name": "Dr IQ" },
  { "id": 19, "name": "Magma" },
  { "id": 20, "name": "Tornado" }
];

@Component({
  selector: 'tuto-app',
  templateUrl: './components/tuto-app/tuto-app.html',
  styleUrls: ['./components/tuto-app/tuto-app.css']
})
export class TutoApp {
  public title = 'Tour of Heroes';
  public heroes = HEROES;
  selectedHero: Hero;

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }
}
