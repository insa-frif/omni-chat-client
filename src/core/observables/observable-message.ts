import * as Bluebird from "bluebird";
import {interfaces} from "omni-chat";
import {BehaviorSubject} from 'rxjs';

export type LibMessage = interfaces.Message;

export class ObservableMessage {
  protected _loaded: boolean = false;

  body: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  libMessage: LibMessage;

  constructor (libMessage: LibMessage) {
    this.libMessage = libMessage;
  }

  init(): Bluebird<this> {
    if (this._loaded) {
      return Bluebird.resolve(this);
    } else {
      return this.load();
    }
  }

  // Force a reload
  load (): Bluebird<this> {
	  this._loaded = true;
	  return Bluebird
		  .all([
			  this.loadBody()
		  ])
		  .thenReturn(this);
  }

	loadBody(): Bluebird<string> {
		return Bluebird.try(() =>{
			return this.libMessage.getBody();
		})
		.then((body: string) => {
			this.body.next(body);
			return body;
		});
	}
}

let messages: {[id: string]: ObservableMessage} = {};
export function wrapMessage (libMessage: LibMessage): ObservableMessage {
  let id: string = libMessage.getGlobalIdSync();
  if (!(id in messages)) {
    messages[id] = new ObservableMessage(libMessage);
  }
  return messages[id];
}

export function getMessage (libMessage: LibMessage): Bluebird<ObservableMessage> {
  return wrapMessage(libMessage).init();
}
