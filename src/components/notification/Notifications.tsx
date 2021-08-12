import { observer } from "mobx-react-lite";
import { useRootStore } from "../../providers/use-root-store";
import { isEmptyString } from "../../utils/utils";
import Notification from "./Notification";
import { NotificationLayout } from "./Notifications.styles";

const Notifications = () => {
  const { notificationStore } = useRootStore();

  if (notificationStore.notifications.length) {
    return (
      <NotificationLayout>
        {notificationStore.notifications.map((item) => {
          if (isEmptyString(item.message)) {
            return null;
          }
          const onClose = () => {
            notificationStore.removeNotification(item.index);
          };
          return <Notification {...item} key={item.index} onClose={onClose} />;
        })}
      </NotificationLayout>
    );
  }

  return null;
};

export default observer(Notifications);
