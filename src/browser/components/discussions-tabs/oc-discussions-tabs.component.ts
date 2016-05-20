import {Component, OnInit} from '@angular/core';

import {Contact} from '../../services/oc-account.service';
import {Discussion} from '../../services/oc-discussion.service';
import {DiscussionService} from '../../services/oc-discussion.service';

@Component({
	selector: "oc-discussions-tabs",
	templateUrl: "./components/discussions-tabs/discussions-tabs.component.html",
	styleUrls: ["./components/discussions-tabs/discussions-tabs.component.css"],
	directives: [],
	providers: [DiscussionService]
})
export class DiscussionsTabsComponent implements OnInit {
	public discussions: Discussion[] = null;

	public getOrCreateDiscussion(c: Contact): void {
		this._discussionService.getOrCreateDiscussion(c).then(
			(d: Discussion) => {
				console.log(d);
				let exists: boolean = false;
				for(let i = 0; i<this.discussions.length; i++) {
					let discuss: Discussion = this.discussions[i];
					if(discuss.contacts[0] === d.contacts[0]){
						console.log("This discussion already exists !");
						exists = true;
						break;
					}
				}
				if(!exists){
					console.log("This discussion doesn't exist : let's create it");
					this.discussions.push(d);
				}
			}
		)
	}

	public closeTab(disc: Discussion): void {
		for(let i: number = 0; i< this.discussions.length; i++) {
			let discussion = this.discussions[i];
			if(discussion === disc) {
				this.discussions.splice(i, 1);
				break;
			}
		}
	}

	public ngOnInit(): void {
		this.discussions = new Array();
		window.document.getElementById("handleEventDiscussionWanted").addEventListener(
			"discussionWanted",
			(event: CustomEvent) => {
				console.log("Event received !");
				console.log(event.detail.contact);
				this.getOrCreateDiscussion(event.detail.contact);
			}
		)
	}

	public constructor(private _discussionService: DiscussionService) {
		// Nothing to do here
	}
}
