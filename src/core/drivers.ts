import {createDriver, Driver} from "./palantiri-proxy/proxy-connection";

export interface SkypeOptions {
  credentials: {
    username: string;
    password: string;
  }
}

export interface FacebookOptions {
  credentials: {
    email: string;
    password: string;
  }
}

export const skypeDriver: Driver<SkypeOptions> = createDriver<SkypeOptions>("skype");
export const facebookDriver: Driver<FacebookOptions> = createDriver<FacebookOptions>("facebook");
