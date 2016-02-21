import 'reflect-metadata';

import {bootstrap} from 'angular2/platform/browser';
import {ContactsList} from './components/contacts-list/contacts-list';

bootstrap(ContactsList);

function g(): void {
  alert("fuck off");
}

// option 1:
// on force le global :s
// window.g = g;

// option 2:
// window.document.getElementById("monBouton").onclick = g; // plus rapide
window.document.getElementById("monBouton").addEventListener("click", g, true); // plus propre

// option 3:
// Faire un composant, mettre le bouton dans le .jade et la fonction dans le .ts (cf contacts-list)

// aides:
// https://angular.io/docs/ts/latest/tutorial/   (très conseillé, je vais le suivre aussi)
// https://angular.io/cheatsheet  (ils donnent un exemple pour calculer la largeur en fonction d'une expression/fonction)

