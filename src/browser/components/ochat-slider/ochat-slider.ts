import {Component, NgZone} from 'angular2/core';

export interface Image {
  src: string,
  title?: string
}

@Component({
  selector: 'ochat-slider',
  templateUrl: './components/contacts-list/contacts-list.html',
  styleUrls: ['./components/contacts-list/contacts-list.css']
})
export class ContactsList {
  public images:Image[] = [
    {
      src: "http://i.imgur.com/wvVJg64.jpg",
      title: "I have no idea"
    },
    {
      src: "http://i.imgur.com/7ZFzzJ3.jpg",
      title: "Basically"
    },
    {
      src: "http://i.imgur.com/OYNaRyV.jpg",
      title: "How projects work"
    }
  ];

  public curIndex = 0;

  public constructor(zone:NgZone) {
    // handle outside events:
    // eventEmitter.on("eventName", (ev: Event) => {
    //     zone.run(() => {
    //         this.handle(ev);
    //     });
    // });
  }

  public prev() {
    if(this.curIndex > 0){
      this.curIndex--;
    }
  }

  public next() {
    if(this.curIndex < this.images.length-1){
      this.curIndex++;
    }
  }

}
