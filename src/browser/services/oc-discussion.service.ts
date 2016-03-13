/**
 * Created by Ruben on 13/03/2016.
 */

import {Injectable} from 'angular2/core';

import {Contact, User, userG} from './oc-account.service';

@Injectable()
export class DiscussionService {
	public getOrCreateDiscussion(c: Contact): Promise<Discussion>
	{
		return this.getOrCreateDiscussionFromHard(c);
	}

	private getOrCreateDiscussionFromHard(c: Contact): Promise<Discussion>
	{
		return Promise.resolve(discG);
	}
}

// TODO : replace the following by database access from oc-library
export class Discussion
{
	public title: string;
	public contacts: Contact[];
}

let discG: Discussion = {
	title: "My super conv",
	contacts: [
		userG.contacts[0]
	]
};