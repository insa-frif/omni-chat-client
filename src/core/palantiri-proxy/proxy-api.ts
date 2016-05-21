import * as Bluebird from "bluebird";
import {EventEmitter} from "events";
import {Incident} from "incident";
import * as _ from "lodash";
import * as Pltr from "palantiri-interfaces";

export class ProxyApi extends EventEmitter implements Pltr.Api {
  driverName: string;
  user: Pltr.UserAccount = null;


  // TODO: get more infos about the current user
  constructor (driverName: string) {
    super();
    this.driverName = driverName;
  }

  protected handleMessageEvent (nativeEvent: any) {}

  addMembersToDiscussion(members: Array<Pltr.AccountReference | Pltr.AccountGlobalId>, discussion: Pltr.DiscussionReference | Pltr.DiscussionGlobalId, options?: any): Bluebird<this> {
    return Bluebird.reject(new Incident("todo", "addMembersToDiscussion is not implemented yet"));
  }

  createDiscussion(members: Array<Pltr.AccountReference | Pltr.AccountGlobalId>, options?: Pltr.Api.CreateDiscussionOptions): Bluebird<Pltr.Discussion> {
    return Bluebird.reject(new Incident("todo", "createDiscussion is not implemented yet"));
  }

  getAccount(account: Pltr.AccountReference | Pltr.AccountGlobalId): Bluebird<Pltr.Account> {
    return Bluebird.reject(new Incident("todo", "getAccount is not implemented yet"));
  }

  getContacts(options?: any): Bluebird<Pltr.Account[]> {
    return Bluebird.reject(new Incident("todo", "getContacts is not implemented yet"));
  }

  getCurrentUser(): Bluebird<Pltr.UserAccount> {
    return Bluebird.reject(new Incident("todo", "getCurrentUser is not implemented yet"));
  }

  /**
   * PROTECTED
   * Returns the information associated to a thread from a threadID
   * @param threadID
   */
  protected getDiscussion(threadID: string): Bluebird<Pltr.Discussion> {
    return Bluebird.reject(new Incident("todo", "getDiscussion is not implemented yet"));
  }

  getDiscussions(options?: Pltr.Api.GetDiscussionsOptions): Bluebird<Pltr.Discussion[]> {
    return Bluebird.reject(new Incident("todo", "getDiscussions is not implemented yet"));
  }

  getMessagesFromDiscussion(discussion: Pltr.DiscussionReference | Pltr.DiscussionGlobalId, options?: Pltr.Api.GetMessagesFromDiscussionOptions): Bluebird<Pltr.Message[]> {
    return Bluebird.reject(new Incident("todo", "getMessagesFromDiscussion is not implemented yet"));
  }

  leaveDiscussion(discussion: Pltr.DiscussionReference | Pltr.DiscussionGlobalId, options?: any): Bluebird<this> {
    return Bluebird.reject(new Incident("todo", "leaveDiscussion is not implemented yet"));
  }

  removeMembersFromDiscussion(members: Array<Pltr.AccountReference | Pltr.AccountGlobalId>, discussion: Pltr.DiscussionReference | Pltr.DiscussionGlobalId, options?: any): Bluebird<this> {
    return Bluebird.reject(new Incident("todo", "removeMembersFromDiscussion is not implemented yet"));
  }

  sendMessage(message: Pltr.Api.NewMessage, discussion: Pltr.DiscussionReference | Pltr.DiscussionGlobalId, options?: any): Bluebird<Pltr.Message> {
    return Bluebird.reject(new Incident("todo", "sendMessage is not implemented yet"));
  }
}
