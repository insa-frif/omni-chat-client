import {Component, NgZone, OnInit, Type} from 'angular2/core';

import {Hero} from "../../interfaces/hero";
import {HeroDetailComponent} from "../hero-detail/hero-detail";
import {HeroService} from "../../services/hero";
import {Router} from "angular2/router";

@Component({
  selector: 'my-heroes',
  templateUrl: './components/heroes/heroes.html',
  styleUrls: ['./components/heroes/heroes.css'],
  directives: [<Type>HeroDetailComponent],
  providers: []
})
export class HeroesComponent implements OnInit {
  public heroes: Hero[] = [];

  selectedHero: Hero;

  private _router: Router;
  private _heroService: HeroService;

  constructor(_router: Router, _heroService: HeroService) {
    this._router = _router;
    this._heroService = _heroService;
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  getHeroes() {
    return this._heroService
      .getHeroes()
      .then(heroes => {
        return this.heroes = heroes;
      });
  }

  gotoDetail() {
    this._router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
  }

}
