import { Messages } from "./messages";

export interface User {
  Id?: number;
  name: string;
  Posts?: Messages[];
}

export class Users implements User {
  Id?: number;
  name: string;
  Posts?: Messages[];
  token?: string;

  constructor(obj?: any) {
    this.Id = obj.Id || null;
    this.name = obj.name || null;
    this.Posts = obj.Posts || [];
    this.token = obj.token || null;
  }
}
