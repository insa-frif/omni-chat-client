import {interfaces} from "omni-chat";
import {BehaviorSubject} from 'rxjs';
import {uuid} from "../utils";

export type LibMessage = interfaces.Message;

export class ObservableMessage {
  body: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  libMessage: any; // ocLib.interfaces.Message

  constructor (libMessage: LibMessage) {
    this.libMessage = libMessage;
    this.load();
  }

  // Force a reload
  load () {
    this.body.next(uuid("message-body"));
    // this.libMessage.getBody().then(body => this.body.next(body));
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
