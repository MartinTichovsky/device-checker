import { NotificationType } from "../../components/notification/types";
import { NotificationStore } from "../notifiction-store";

describe("Notification Store", () => {
  const store = new NotificationStore();

  it("Notifications", () => {
    expect(store.notifications.length).toBe(0);
    const firstNotification: NotificationType = { message: "message 1" };
    store.addNotification(firstNotification);
    expect(store["index"]).toBe(1);
    expect(store.notifications.length).toBe(1);
    expect(store.notifications[0]).toEqual({
      ...firstNotification,
      index: store["index"]
    });

    const secondNotification: NotificationType = { message: "message 2" };
    store.addNotification(secondNotification);
    expect(store["index"]).toBe(2);
    expect(store.notifications.length).toBe(2);
    expect(store.notifications[1]).toEqual({
      ...secondNotification,
      index: store["index"]
    });

    store.removeNotification(store.notifications[0].index);
    expect(store.notifications.length).toBe(1);
    expect(store.notifications[0]).toEqual({
      ...secondNotification,
      index: store["index"]
    });

    store.removeNotification(0);
    expect(store.notifications.length).toBe(1);
    expect(store.notifications[0]).toEqual({
      ...secondNotification,
      index: store["index"]
    });

    store.removeNotification(store.notifications[0].index);
    expect(store.notifications.length).toBe(0);
  });
});
