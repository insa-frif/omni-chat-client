import * as socketIO from "socket.io-client";
import * as Bluebird from "bluebird";
import {uuid} from "../../core/utils";

export interface DeferredPromise<T>{
  promise: Bluebird<T>,
  resolve: (result: T) => any,
  reject: (err: Error) => any
}

export function getDeferredPromise<T>(): DeferredPromise<T>{
  let deferred: DeferredPromise<T> = {
    promise: null,
    resolve: null,
    reject: null
  };

  deferred.promise = new Bluebird((resolve: (result: T) => any, reject: (error: Error) => any) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  return deferred;
}

export class ProxySocket {
  socket: any = null;
  pendingRequests: {[id: string]: DeferredPromise<any>} = {};

  connect (): any {
    this.socket = socketIO("localhost:8080");
    this.socket.on("request-response", (data: any) => {
      this.onRequestResponse(data);
    });
    return this.socket;
  }

  onRequestResponse (response: any) {
    console.log("received response");
    let id = response.id;
    let error = response.error;
    let data = response.data;
    if (id in this.pendingRequests) {
      let deferred = this.pendingRequests[id];
      delete this.pendingRequests[id];
      if (error === null) {
        deferred.resolve(data);
      } else {
        deferred.reject(new Error(String(error)));
      }
    }
  }

  request (type: string, data: any): Bluebird<any> {
    return Bluebird.try(() => {
      let deferred: DeferredPromise<any> = getDeferredPromise();
      let id = uuid("proxy-request");
      this.pendingRequests[id] = deferred;
      this.socket.emit("request", {
        id: id,
        type: type,
        data: data
      });
      console.log("sent request");
      return deferred.promise.timeout(10000, `Request ${type} timed-out`);
    });
  }
}
