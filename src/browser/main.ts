import 'reflect-metadata';
import {Type} from "angular2/core";
import {bootstrap} from 'angular2/platform/browser';

import $ from 'jquery';
console.log($);

import {OcAppComponent} from './components/oc-app/oc-app.component';

bootstrap(<Type>OcAppComponent);
