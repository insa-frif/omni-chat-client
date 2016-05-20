import {Component, OnInit, Type} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {MdAnchor} from '@angular2-material/button/button';
import {MdCard} from '@angular2-material/card/card';
import {MdToolbar} from '@angular2-material/toolbar/toolbar';

@Component({
  selector: "oc-home",
  templateUrl: "./components/home/home.component.html",
  styleUrls: ["./components/home/home.component.css"],
  directives: [MdAnchor, MdCard, MdToolbar, ROUTER_DIRECTIVES]
})
export class HomeComponent implements OnInit {
  title: string = "OmniChat";
  private _router: Router;

  public ngOnInit(): void {}

  constructor (router: Router) {
    this._router = router;
  }
}
