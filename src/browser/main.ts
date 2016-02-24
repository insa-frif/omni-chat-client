import 'reflect-metadata';
import {bootstrap} from 'angular2/platform/browser';

import {SliderComponent} from './components/slider.component';

bootstrap(SliderComponent);

/* LISTENERS */
// TODO : deplacer ce qui suit dans un nouveau fichier
function logIn(): void
{
	alert("Impossible to log in for the moment. Be patient !");
}

function signIn(): void
{
	alert("Impossible to sign in for the moment. Be patient !");
}

window.document.getElementById("connect").addEventListener("click", logIn, true);
window.document.getElementById("sign").addEventListener("click", signIn, true);
