import {interfaces} from "omni-chat";
import {BehaviorSubject} from 'rxjs';
import {ObservableMessage, wrapMessage} from "./observable-message";
import * as Bluebird from "bluebird";

export type LibDiscussion = interfaces.Discussion;

export class ObservableDiscussion {
  name: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  description: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  creationDate: BehaviorSubject<Date> = new BehaviorSubject<Date>(null);
  messages: BehaviorSubject<ObservableMessage[]> = new BehaviorSubject<ObservableMessage[]>([]);

  libDiscussion: LibDiscussion;

  constructor (libDiscussion: LibDiscussion) {
    this.libDiscussion = libDiscussion;
    this.load();

    // TODO: make this work
    // this.libDiscussion.on("message", (message) => {
    //   let old = this.messages.getValue();
    //   old.push(wrapMessage(message));
    //   this.messages.next(old);
    // });
  }

  // Force a reload
  load () {
		this.loadName();
	  this.loadDescription();
	  this.loadCreationDate();
	  this.loadMessages();
  }

  loadName (): Bluebird<string> {
    return Bluebird.resolve(this.libDiscussion.getName())
      .then((name: string) => {
        this.name.next(name);
        return name;
      })
  }

  getName (): Bluebird<string> {
    return this.loadName();
  }

  loadDescription (): Bluebird<string> {
    return Bluebird.resolve(this.libDiscussion.getDescription())
      .then((description: string) => {
        this.description.next(description);
        return description;
      })
  }

  getDescription (): Bluebird<string> {
    return this.loadDescription();
  }

  loadCreationDate (): Bluebird<Date> {
    return Bluebird.resolve(this.libDiscussion.getCreationDate())
      .then((creationDate: Date) => {
        this.creationDate.next(creationDate);
        return creationDate;
      })
  }

  getCreationDate (): Bluebird<Date> {
    return this.loadCreationDate();
  }

  loadMessages (options?: interfaces.Discussion.GetMessagesOptions): Bluebird<ObservableMessage[]> {
    return Bluebird
	    .try(() => {
		    return this.libDiscussion.getMessages(options);
	    })
	    .map((msg: interfaces.Message) => {
		    return wrapMessage(msg);
	    })
	    .then((messages: ObservableMessage[]) => {
		    this.messages.next(messages);
	    })
	    .thenReturn(this.messages.getValue());
  }

  getMessages (options?: interfaces.Discussion.GetMessagesOptions): Bluebird<ObservableMessage[]> {
    return this.loadMessages(options);
  }

  sendMessage (newMessage: interfaces.Discussion.NewMessage): Bluebird<ObservableMessage> {
    return Bluebird.resolve(this.libDiscussion.sendMessage(newMessage))
      .then((libMessage: interfaces.Message) => {
        let observableMessage = wrapMessage(libMessage);
        let currentMessages: ObservableMessage[] = this.messages.getValue();
        if (currentMessages === null) {
          currentMessages = [observableMessage];
        } else {
          currentMessages.push(observableMessage);
        }
        this.messages.next(currentMessages);
        return observableMessage;
      });
  }

}

/**
 * Wrap the ocLib-Discussion to a unique ObservableDiscussion
 * @param libDiscussion
 */
let discussions: {[id: string]: ObservableDiscussion} = {};
export function wrapDiscussion (libDiscussion: LibDiscussion): ObservableDiscussion {
  let id: string = libDiscussion.getGlobalIdSync();
  if (!(id in discussions)) {
    discussions[id] = new ObservableDiscussion(libDiscussion);
  }
  return discussions[id];
}
