import 'reflect-metadata';
import {Type} from "angular2/core";
import {bootstrap} from 'angular2/platform/browser';

import {OcApp} from './components/oc-app/oc-app.component';
import {SliderComponent} from './components/oc-slider/oc-slider.component';

bootstrap(<Type>OcApp);
