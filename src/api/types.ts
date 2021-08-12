export type AuthToken = string;

export interface BorrowedObj {
  user?: User;
  date?: number;
}

export enum OsEnum {
  ANDROID = "ANDROID",
  IOS = "IOS",
  WINDOWS = "WINDOWS",
}

export interface Phone {
  id?: string;
  code?: string;
  os?: OsEnum;
  vendor?: string;
  model?: string;
  osVersion?: string;
  image?: string;
  borrowed?: BorrowedObj;
}

export type Phones = Phone[];

export interface User {
  id?: number;
  type?: TypeEnum;
  login?: string;
  name?: string;
}

export interface UserWithToken {
  id?: string;
  type?: TypeEnum;
  login?: string;
  name?: string;
  token?: AuthToken;
}

export enum TypeEnum {
  User = "user",
  Admin = "admin",
}
