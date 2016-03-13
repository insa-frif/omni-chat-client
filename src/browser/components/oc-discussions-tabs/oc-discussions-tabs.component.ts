/**
 * Created by Ruben on 11/03/2016.
 */

import {Component, OnInit} from 'angular2/core';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material/all";

import {Contact} from '../../services/oc-account.service';
import {Discussion} from '../../services/oc-discussion.service';
import {DiscussionService} from '../../services/oc-discussion.service';

@Component({
	selector: "oc-discussions-tabs",
	templateUrl: "./components/oc-discussions-tabs/oc-discussions-tabs.component.html",
	styleUrls: ["./components/oc-discussions-tabs/oc-discussions-tabs.component.css"],
	directives: [MATERIAL_DIRECTIVES],
	providers: [
		MATERIAL_PROVIDERS,
		DiscussionService
	]
})
export class OcDiscussionsTabsComponent implements OnInit {
	public discussions: Discussion[] = null;

	public getOrCreateDiscussion(c: Contact): void {
		this._discussionService.getOrCreateDiscussion(c).then(
			(d: Discussion) => {
				let exists: boolean = false;
				for(let i = 0; i<this.discussions.length; i++) {
					let discuss: Discussion = this.discussions[i];
					if(!(discuss === d)){
						exists = true;
						break;
					}
				}
				if(!exists){
					this.discussions.push(d);
				}
			}
		)
	}

	public ngOnInit(): void
	{
		window.document.getElementById("handleEventDiscussionWanted").addEventListener(
			"discussionWanted",
			(event: CustomEvent) => {
				console.log("Event received !");
				console.log(event.detail.contact);
			}
		)
	}

	public constructor(private _discussionService: DiscussionService) {
		// Nothing to do here
	}
}