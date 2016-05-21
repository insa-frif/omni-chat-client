import 'reflect-metadata';
import {APP_BASE_HREF} from '@angular/common';
import {provide, Renderer} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router';
import {MdIconRegistry} from '@angular2-material/icon/icon-registry';

import {AppComponent} from './components/app/app.component';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  provide(MdIconRegistry, {
    useFactory: (http: Http) => {
      return new MdIconRegistry(http);
    },
    deps: [Http]
  }),
  Renderer,
  provide(APP_BASE_HREF, {useValue: '/'}) // Base url
]);
