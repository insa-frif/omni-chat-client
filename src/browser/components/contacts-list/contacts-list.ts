import {Component, NgZone} from 'angular2/core';

export interface Contact {
  realname: string
}

@Component({
  selector: 'contacts-list',
  templateUrl: './components/contacts-list/contacts-list.html',
  styleUrls: ['./components/contacts-list/contacts-list.css']
})
export class ContactsList {
  public contacts:Contact[] = [
    {
      realname: "Charles"
    },
    {
      realname: "Ruben"
    }
  ];

  public constructor(zone:NgZone) {
    // handle outside events:
    // eventEmitter.on("eventName", (ev: Event) => {
    //     zone.run(() => {
    //         this.handle(ev);
    //     });
    // });
  }

  public removeContact(contact:Contact) {
    // console.log(contact);
    let idx = this.contacts.indexOf(contact);
    if (idx >= 0) {
      this.contacts.splice(idx, 1);
    }
    // console.log(this);
  }
}
