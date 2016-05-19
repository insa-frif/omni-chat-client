/**
 * Created by Ruben on 28/02/2016.
 */

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: "oc-toolbar",
  templateUrl: "./components/oc-toolbar/oc-toolbar.component.html",
  styleUrls: ["./components/oc-toolbar/oc-toolbar.component.css"]
})
export class OcToolbarComponent implements OnInit
// TODO : rename to follow Angular naming rules
{
  public title: string = "My Toolbar";

  public ngOnInit(): void
  {
    window.document.getElementById("disconnect").addEventListener(
      "click",
      () => {
        this._router.navigate(['Home']);
      },
      true
    );
    // TODO : add real disconnect code
  }

  constructor(private _router: Router)
  {
    // Nothing to do here
  }
}