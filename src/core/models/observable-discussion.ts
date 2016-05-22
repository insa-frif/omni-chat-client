import {interfaces} from "omni-chat";
import {Subject, BehaviorSubject} from 'rxjs';
import {ObservableMessage} from "./observable-message";

export type LibDiscussion = interfaces.DiscussionInterface;

export class ObservableDiscussion {
  name: Subject<string> = new BehaviorSubject<string>(null);
  messages: Subject<ObservableMessage[]> = new BehaviorSubject<ObservableMessage[]>([]);

  libDiscussion: LibDiscussion; // ocLib.interfaces.discussion

  constructor (libDiscussion: LibDiscussion) {
    this.libDiscussion = libDiscussion;
    this.load();
  }

  // Force a reload
  load () {
    this.messages.next([
      new ObservableMessage(null), // todo: use an oc message
      new ObservableMessage(null)
    ]);
  }
}
