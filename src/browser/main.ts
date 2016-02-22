import 'reflect-metadata';

import {bootstrap} from 'angular2/platform/browser';

console.log("hello !");

function gw(): void
{
	alert("f*ck off");
}

window.document.getElementById("connect").addEventListener("click", gw, true);
