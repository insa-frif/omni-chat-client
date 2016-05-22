import {Injectable} from '@angular/core';
import {Subject, BehaviorSubject} from 'rxjs';

import {ObservableDiscussion} from "../../core/models/observable-discussion";

@Injectable()
export class DiscussionService {
  currentDiscussion: Subject<ObservableDiscussion> = new BehaviorSubject<ObservableDiscussion>(null);

  public setCurrentDiscussion (newDiscussion: ObservableDiscussion): void {
    this.currentDiscussion.next(newDiscussion);
  }
}
