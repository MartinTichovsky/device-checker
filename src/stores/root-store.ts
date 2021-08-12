import { action, makeObservable, observable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import React from "react";
import { UserWithToken } from "../api/types";
import { NotificationStore } from "./notifiction-store";

export class RootStore {
  notificationStore: NotificationStore = new NotificationStore();

  constructor() {
    makeObservable(this);
    makePersistable(this, {
      name: "RootStore",
      properties: ["loggedUser" as keyof RootStore],
      storage: window.localStorage,
    }).then(() => {
      this.setPersisted();
    });
  }

  @observable
  isPersisted: boolean = false;

  @observable
  private loggedUser: UserWithToken | null = null;

  get isUserAdmin() {
    return this.user?.type === "admin";
  }

  get isAuthorized() {
    return this.loggedUser !== null;
  }

  get user() {
    return this.loggedUser;
  }

  private loadingRef: React.RefObject<HTMLElement> | null = null;

  @action
  private setPersisted = () => (this.isPersisted = true);

  public hideLoading() {
    if (this.loadingRef?.current) {
      this.loadingRef.current.style.display = "none";
    }
  }

  public setLoadingRef(ref: React.RefObject<HTMLElement>) {
    this.loadingRef = ref;
  }

  @action
  public setUser(user: UserWithToken | null) {
    this.loggedUser = user;
  }

  public showLoading() {
    if (this.loadingRef?.current) {
      this.loadingRef.current.style.display = "block";
    }
  }
}
