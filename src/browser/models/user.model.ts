import {uuid} from "../../core/utils";

export class UserModel {
  id: string;
  public name: string;
  public avatarSrc: string;

  constructor(name: string, avatarSrc: string) {
    this.name = name;
    this.avatarSrc = avatarSrc;
    this.id = uuid("user");
  }
}
