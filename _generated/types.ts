export type AuthToken = string;

export interface UserWithToken {
  id?: string;
  type?: UserWithToken.TypeEnum;
  login?: string;
  name?: string;
  token?: AuthToken;
}

////////

/**
 *
 * @export
 * @interface EditPhone
 */
export interface EditPhone {
  /**
   *
   * @type {string}
   * @memberof EditPhone
   */
  code?: string;
  /**
   *
   * @type {string}
   * @memberof EditPhone
   */
  os?: EditPhone.OsEnum;
  /**
   *
   * @type {string}
   * @memberof EditPhone
   */
  vendor?: string;
  /**
   *
   * @type {string}
   * @memberof EditPhone
   */
  model?: string;
  /**
   *
   * @type {string}
   * @memberof EditPhone
   */
  osVersion?: string;
  /**
   *
   * @type {string}
   * @memberof EditPhone
   */
  image?: string;
}

/**
 * @export
 * @namespace EditPhone
 */
export namespace EditPhone {
  /**
   * @export
   * @enum {string}
   */
  export enum OsEnum {
    ANDROID = "ANDROID",
    IOS = "IOS",
    WINDOWS = "WINDOWS",
  }
}

/**
 *
 * @export
 * @interface LoginData
 */
export interface LoginData {
  /**
   *
   * @type {string}
   * @memberof LoginData
   */
  login?: string;
  /**
   *
   * @type {string}
   * @memberof LoginData
   */
  password?: string;
}

/**
 *
 * @export
 * @interface ModelError
 */
export interface ModelError {
  /**
   *
   * @type {string}
   * @memberof ModelError
   */
  error?: string;
}

/**
 * @export
 * @namespace User
 */
export namespace User {
  /**
   * @export
   * @enum {string}
   */
  export enum TypeEnum {
    User = "user",
    Admin = "admin",
  }
}
/**
 * @export
 * @namespace UserWithToken
 */
export namespace UserWithToken {
  /**
   * @export
   * @enum {string}
   */
  export enum TypeEnum {
    User = "user",
    Admin = "admin",
  }
}
