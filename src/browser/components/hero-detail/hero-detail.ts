import {Component, NgZone} from 'angular2/core';

import {Hero} from "../../interfaces/hero";

@Component({
  selector: 'my-hero-detail',
  templateUrl: './components/hero-detail/hero-detail.html',
  styleUrls: ['./components/hero-detail/hero-detail.css'],
  inputs: ['hero']
})
export class HeroDetailComponent {
  public hero: Hero;
}
