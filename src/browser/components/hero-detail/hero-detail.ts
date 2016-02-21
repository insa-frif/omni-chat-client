import {Component, NgZone, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {HeroService} from "../../services/hero";
import {Hero} from "../../interfaces/hero";

@Component({
  selector: 'my-hero-detail',
  templateUrl: './components/hero-detail/hero-detail.html',
  styleUrls: ['./components/hero-detail/hero-detail.css'],
  inputs: ['hero']
})
export class HeroDetailComponent implements OnInit {
  public hero: Hero;

  private _heroService: HeroService;
  private _routeParams: RouteParams;

  constructor(_heroService: HeroService, _routeParams: RouteParams) {
    this._heroService = _heroService;
    this._routeParams = _routeParams;
  }

  ngOnInit() {
    let id = parseInt(this._routeParams.get('id'), 10);
    this._heroService.getHero(id)
      .then(hero => this.hero = hero);
  }

  goBack() {
    window.history.back();
  }

}
