/**
 * Created by Ruben on 26/02/2016.
 */

import {Component} from 'angular2/core';
import {Type} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material/all';

import {SliderComponent} from '../oc-slider/oc-slider.component';
import {OcHomeUpperbandComponent} from '../oc-home-upperband/oc-home-upperband.component';

@Component({
  selector: "oc-home",
  templateUrl: "./components/oc-home/oc-home.component.html",
  styleUrls: ["./components/oc-home/oc-home.component.css"],
  directives: [
    <Type>SliderComponent,
    <Type>OcHomeUpperbandComponent,
	  MATERIAL_DIRECTIVES
  ],
	providers: [MATERIAL_PROVIDERS]
})
export class OcHomeComponent implements OnInit
{
  title: string = "OmniChat - A chat to rule them all";

  public ngOnInit(): void
  {
    // TODO (later) : use true methods when available from library
  }

  constructor(private _router: Router)
  {
    // Nothing to do here
  }
}