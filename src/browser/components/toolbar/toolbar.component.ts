import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: "oc-toolbar",
  templateUrl: "./components/toolbar/toolbar.component.html",
  styleUrls: ["./components/toolbar/toolbar.component.css"]
})
export class ToolbarComponent implements OnInit {
  public title: string = "My Toolbar";

  private _router: Router;

  constructor(router: Router) {
    this._router = router;
  }

  public ngOnInit(): void {
    // window.document.getElementById("disconnect").addEventListener(
    //   "click",
    //   () => {
    //     this._router.navigate(['Home']);
    //   },
    //   true
    // );
  }
}
