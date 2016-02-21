import {Component, NgZone, OnInit, Type} from 'angular2/core';

import {Hero} from "../../interfaces/hero";
import {HeroDetailComponent} from "../hero-detail/hero-detail";
import {HeroService} from "../../services/hero";

@Component({
  selector: 'my-app',
  templateUrl: './components/app/app.html',
  styleUrls: ['./components/app/app.css'],
  directives: [<Type>HeroDetailComponent],
  providers: [HeroService]
})
export class AppComponent implements OnInit {
  public title = 'Tour of Heroes';
  public heroes: Hero[] = [];

  selectedHero: Hero;

  private _heroService: HeroService;

  constructor(private _heroService: HeroService) {
    this._heroService = _heroService;
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  getHeroes() {
    this._heroService
      .getHeroes()
      .then(heroes => {
        this.heroes = heroes;
      });
  }

}
