import {Injectable} from 'angular2/core';
import {HEROES} from "../mocks/heroes";
import {Hero} from "../interfaces/hero";
import * as Promise from "bluebird";

@Injectable()
export class HeroService {
  getHeroes(): Promise<Hero[]> {
    return Promise.resolve(HEROES);
  }
  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
      .then((heroes: Hero[]) => {
        return heroes.filter(hero => hero.id === id)[0]
      });
  }
}
