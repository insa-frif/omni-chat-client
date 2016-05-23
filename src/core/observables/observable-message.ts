import * as Bluebird from "bluebird";
import {interfaces} from "omni-chat";
import {BehaviorSubject} from 'rxjs';
import {uuid} from "../utils";

export type LibMessage = interfaces.Message;

export class ObservableMessage {
  protected _loaded: boolean = false;

  body: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  libMessage: any; // ocLib.interfaces.Message

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
  load () {
    this._loaded = true;

    // this.libMessage.getBody().then(body => this.body.next(body));
    this.body.next(uuid("message-body"));

    return Bluebird.resolve(this);
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
