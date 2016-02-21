import {Injectable} from 'angular2/core';
import {HEROES} from "../mocks/heroes";
import {Hero} from "../interfaces/hero";
import * as Promise from "bluebird";

@Injectable()
export class HeroService {
  getHeroes(): Promise<Hero[]> {
    return Promise.resolve(HEROES);
  }
}
