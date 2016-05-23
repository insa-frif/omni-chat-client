import * as palantiri from "palantiri-interfaces";
import {EventEmitter} from "events";
import {Incident} from "incident";
import * as Bluebird from "bluebird";
import {ProxyApi} from "./proxy-api";
import {ProxySocket} from "./proxy-socket";

export interface Driver<TOptions> {
  driver: string;
  new(options?: TOptions): palantiri.Connection;
}

enum ConnectionState {
  DISCONNECTED,
  CONNECTING,
  CONNECTED
}

export function createDriver<TOptions> (driverName: string): Driver<TOptions> {
  class Proxy extends EventEmitter {
    static driver: string;
    driver: string = driverName;
    options: TOptions;
    api: ProxyApi = null;

    private connectionState: ConnectionState = ConnectionState.DISCONNECTED;

    constructor (options?: TOptions) {
      super();
      this.options = options;
    }

    getInfo(): any {
      return {driver: this.driver};
    }

    isConnected(): boolean {
      return this.connectionState === ConnectionState.CONNECTED;
    }

    getApi(): ProxyApi {
      if (!this.isConnected()) {
        throw new Error("Not connected");
      }
      if (this.api === null) {
        throw new Error("Api is not ready");
      }
      return this.api;
    }

    connect(): Bluebird<ProxyApi> {
      if (this.connectionState === ConnectionState.DISCONNECTED) {
        this.connectionState = ConnectionState.CONNECTING;
      } else {
        return Bluebird.try(() => this.getApi());
      }

      return Bluebird.try(() => {
        let proxySocket = new ProxySocket();
        proxySocket.connect();
        return proxySocket
          .request("start-proxy", {
            driverName: this.driver,
            options: this.options
          })
          .then(() => {
            this.connectionState = ConnectionState.CONNECTED;
            this.api = new ProxyApi(driverName, proxySocket);
            return this.api;
          });
      });
    }

    disconnect(): Bluebird<this> {
      if (this.connectionState === ConnectionState.DISCONNECTED) {
        return Bluebird.resolve(this);
      }

      return Bluebird.reject(new Incident("todo", "Disconnection is not supported yet"));
    }

  }

  Proxy.driver = driverName;

  return Proxy;
}

export default createDriver;
