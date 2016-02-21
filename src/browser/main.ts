import 'reflect-metadata';

import {bootstrap} from 'angular2/platform/browser';

console.log("hello !");

function gw(): void
{
	document.write(window.innerWidth.toString());
	alert("f*ck off");
}

document.getElementById("b").addEventListener("onclick", gw);
