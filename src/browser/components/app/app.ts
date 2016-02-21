import {Component, NgZone, Type} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

import {Hero} from "../../interfaces/hero";
import {HeroesComponent} from "../heroes/heroes";
import {DashboardComponent} from "../dashboard/dashboard";
import {HeroService} from "../../services/hero";
import {HeroDetailComponent} from "../hero-detail/hero-detail";

@Component({
  selector: 'my-app',
  templateUrl: './components/app/app.html',
  styleUrls: ['./components/app/app.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, HeroService]
})
@RouteConfig([
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/detail/:id',
    name: 'HeroDetail',
    component: HeroDetailComponent
  },
  {
    path: '/heroes',
    name: 'Heroes',
    component: HeroesComponent
  }
])
export class AppComponent  {
  public title = 'Tour of Heroes';
}
