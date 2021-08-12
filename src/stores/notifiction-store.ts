import { action, makeObservable, observable } from "mobx";
import { NotificationType } from "../components/notification/types";

interface NotificationItem extends NotificationType {
  index: number;
}

export class NotificationStore {
  constructor() {
    makeObservable(this);
  }

  @observable
  notifications: NotificationItem[] = [];

  private index: number = 0;

  @action
  addNotification(notification: NotificationType) {
    this.notifications.push({ ...notification, index: ++this.index });
  }

  @action
  removeNotification(notificationIndex: number) {
    const index = this.notifications.findIndex(
      (item) => item.index === notificationIndex
    );
    if (index !== -1) {
      this.notifications.splice(index, 1);
    }
  }
}
