import {Injectable} from '@angular/core';
import {Subject, BehaviorSubject} from 'rxjs';

import {ObservableDiscussion} from "../../core/observables/observable-discussion";

@Injectable()
export class DiscussionService {
  currentDiscussion: Subject<ObservableDiscussion> = new BehaviorSubject<ObservableDiscussion>(null);

  public setCurrentDiscussion (newDiscussion: ObservableDiscussion): void {
    this.currentDiscussion.next(newDiscussion);
  }
}
