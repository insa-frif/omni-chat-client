import 'reflect-metadata';
import {APP_BASE_HREF} from '@angular/common';
import {provide} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router';

import {AppComponent} from './components/app/app.component';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  provide(APP_BASE_HREF, {useValue: '/'}) // Base url
]);
