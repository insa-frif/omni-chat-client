import {uuid} from "../../core/utils";

export class UserAccountModel {
  id: string;
  public name: string;
  public driverName: string;

  constructor(name: string, driverName: string) {
    this.name = name;
    this.driverName = driverName;
    this.id = uuid("user-account");
  }
}
