import * as Bluebird from "bluebird";
import {EventEmitter} from "events";
import {Incident} from "incident";
import * as _ from "lodash";
import * as Pltr from "palantiri-interfaces";
import {uuid} from "../../core/utils";
import {ProxySocket} from "./proxy-socket";

export class ProxyApi extends EventEmitter implements Pltr.Api {
  driverName: string;
  proxySocket: ProxySocket;
  currentUser: Pltr.UserAccount = null;

  // TODO: get more infos about the current user
  constructor (driverName: string, proxySocket: ProxySocket) {
    super();
    this.driverName = driverName;
    this.proxySocket = proxySocket;
    this.proxySocket.socket.on("event", (event: any) => {
      this.handleEvent(event);
    });
  }

  protected handleEvent (event: any) {
    if (event && event.type === "message") {
      this.handleMessageEvent (event.data);
    }
  }

  protected handleMessageEvent (event: Pltr.Api.events.MessageEvent) {
    console.log(event);
     this.emit("message", event);
  }

  addMembersToDiscussion(members: Array<Pltr.AccountReference | Pltr.AccountGlobalId>, discussion: Pltr.DiscussionReference | Pltr.DiscussionGlobalId, options?: any): Bluebird<this> {
    return Bluebird
      .try(() => {
        let membersId = _.map(members, Pltr.Id.asGlobalId);
        let discussionId = Pltr.Id.asGlobalId(discussion);
        return this.proxySocket.request("add-members-to-discussion", {members: membersId, discussion: discussionId});
      })
      .thenReturn(this);
  }

  createDiscussion(members: Array<Pltr.AccountReference | Pltr.AccountGlobalId>, options?: Pltr.Api.CreateDiscussionOptions): Bluebird<Pltr.Discussion> {
    return Bluebird
      .try(() => {
        let membersId = _.map(members, Pltr.Id.asGlobalId);
        let compatibleOptions: Pltr.Api.CreateDiscussionOptions = {};
        if (options) {
          if ("name" in options) {
            compatibleOptions.name = options.name;
          }
          if ("description" in options) {
            compatibleOptions.description = options.description;
          }
        }
        return this.proxySocket.request("create-discussion", {members: membersId, options: compatibleOptions});
      })
      .then((discussion: Pltr.Discussion) => {
        return discussion;
      });
  }

  getAccount(account: Pltr.AccountReference | Pltr.AccountGlobalId): Bluebird<Pltr.Account> {
    return Bluebird
      .try(() => {
        let accountId = Pltr.Id.asGlobalId(account);
        return this.proxySocket.request("get-account", {account: accountId});
      })
      .then((account: Pltr.Account) => {
        return account;
      });
  }

  getContacts(options?: any): Bluebird<Pltr.Account[]> {
    return this.proxySocket.request("get-contacts", null)
      .then((contacts: Pltr.Account[]) => {
        return contacts;
      });
  }

  getCurrentUser(): Bluebird<Pltr.UserAccount> {
    if (this.currentUser !== null) {
      return Bluebird.resolve(this.currentUser);
    }

    return this.proxySocket.request("get-current-user", null)
      .then((userAccount: Pltr.Account) => {
        this.currentUser = userAccount;
        return userAccount;
      });
  }

  /**
   * PROTECTED
   * Returns the information associated to a single discussion
   * @param threadID
   */
  protected getDiscussion(discussion: Pltr.DiscussionReference | Pltr.DiscussionGlobalId): Bluebird<Pltr.Discussion> {
    return Bluebird
      .try(() => {
        let discussionId = Pltr.Id.asGlobalId(discussion);
        return this.proxySocket.request("get-discussion", {discussion: discussionId});
      })
      .then((discussion: Pltr.Discussion) => {
        return discussion;
      });
  }

  getDiscussions(options?: Pltr.Api.GetDiscussionsOptions): Bluebird<Pltr.Discussion[]> {
    return Bluebird
      .try(() => {
        let compatibleOptions: Pltr.Api.GetDiscussionsOptions = {};
        if (options) {
          if ("max" in options) {
            compatibleOptions.max = options.max;
          }
        }
        return this.proxySocket.request("get-discussions", {options: compatibleOptions});
      })
      .then((discussions: Pltr.Discussion[]) => {
        if (options && ("filter" in options)) {
          return Bluebird.filter(discussions, (discussion: Pltr.Discussion, index: number, size: number) => {
            return Bluebird.resolve(options.filter(discussion));
          });
        } else {
          return Bluebird.resolve(discussions);
        }
      });
  }

  getMessagesFromDiscussion(discussion: Pltr.DiscussionReference | Pltr.DiscussionGlobalId, options?: Pltr.Api.GetMessagesFromDiscussionOptions): Bluebird<Pltr.Message[]> {
    return Bluebird
      .try(() => {
        let discussionId = Pltr.Id.asGlobalId(discussion);
        let compatibleOptions: Pltr.Api.GetMessagesFromDiscussionOptions = {};
        if (options) {
          if ("max" in options) {
            compatibleOptions.max = options.max;
          }
        }
        return this.proxySocket.request("get-messages-from-discussion", {options: compatibleOptions});
      })
      .then((messages: Pltr.Message[]) => {
        if (options && ("filter" in options)) {
          return Bluebird.filter(messages, (message: Pltr.Message, index: number, size: number) => {
            return Bluebird.resolve(options.filter(message));
          });
        } else {
          return Bluebird.resolve(messages);
        }
      });
  }

  leaveDiscussion(discussion: Pltr.DiscussionReference | Pltr.DiscussionGlobalId, options?: any): Bluebird<this> {
    return Bluebird
      .try(() => {
        let discussionId = Pltr.Id.asGlobalId(discussion);
        return this.proxySocket.request("leave-discussion", {discussion: discussionId});
      })
      .thenReturn(this);
  }

  removeMembersFromDiscussion(members: Array<Pltr.AccountReference | Pltr.AccountGlobalId>, discussion: Pltr.DiscussionReference | Pltr.DiscussionGlobalId, options?: any): Bluebird<this> {
    return Bluebird
      .try(() => {
        let membersId = _.map(members, Pltr.Id.asGlobalId);
        let discussionId = Pltr.Id.asGlobalId(discussion);
        return this.proxySocket.request("remove-members-from-discussion", {members: membersId, discussion: discussionId});
      })
      .thenReturn(this);
  }

  sendMessage(message: Pltr.Api.NewMessage, discussion: Pltr.DiscussionReference | Pltr.DiscussionGlobalId, options?: any): Bluebird<Pltr.Message> {
    return Bluebird
      .try(() => {
        let discussionId = Pltr.Id.asGlobalId(discussion);
        return this.proxySocket.request("send-message", {message: message, discussion: discussionId});
      })
      .then((message: Pltr.Message) => {
        return message;
      });
  }
}
