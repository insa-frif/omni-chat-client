import {Component, NgZone, OnInit, Type} from 'angular2/core';

import {Hero} from "../../interfaces/hero";
import {HeroDetailComponent} from "../hero-detail/hero-detail";
import {HeroService} from "../../services/hero";
import {Router} from "angular2/router";

@Component({
  selector: 'my-dashboard',
  templateUrl: './components/dashboard/dashboard.html',
  styleUrls: ['./components/dashboard/dashboard.css'],
  directives: [],
  providers: []
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  private _router: Router;
  private _heroService: HeroService;

  constructor(_router: Router, _heroService: HeroService) {
    this._router = _router;
    this._heroService = _heroService;
  }

  ngOnInit() {
    this._heroService.getHeroes()
      .then((heroes: Hero[]) => this.heroes = heroes.slice(1,5));
  }

  gotoDetail(hero: Hero){
    let link = ['HeroDetail', { id: hero.id }];
    this._router.navigate(link);
  }

}
