import {Component, OnInit, Type} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {MdButton} from '@angular2-material/button/button';
import {MdToolbar} from '@angular2-material/toolbar/toolbar';

import {SliderComponent} from '../oc-slider/oc-slider.component';
import {OcHomeUpperbandComponent} from '../oc-home-upperband/oc-home-upperband.component';

@Component({
  selector: "oc-home",
  templateUrl: "./components/home/home.component.html",
  styleUrls: ["./components/home/home.component.css"],
  directives: [MdButton, MdToolbar, ROUTER_DIRECTIVES],
  providers: []
})
export class HomeComponent implements OnInit {
  title: string = "OmniChat - A chat to rule them all";
  // private _router: Router;

  public ngOnInit(): void {

  }

  constructor() {
    // this._router = router;
  }
}
