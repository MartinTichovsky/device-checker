import AddIcon from "@material-ui/icons/Add";
import ViewListIcon from "@material-ui/icons/ViewList";
import { i18ObjectPath } from "proxy-object-path";
import { MenuItemType } from "./components/MenuBar";
import { ROUTES } from "./router/routes";
import i18n from "./translations/i18n";
import lang from "./translations/lang";

export const menuItems: MenuItemType[] = [
  {
    admin: true,
    icon: <AddIcon />,
    label: i18n.t(i18ObjectPath(lang.menu.createDevice)),
    url: ROUTES.CREATE_DEVICE
  },
  {
    icon: <ViewListIcon />,
    label: i18n.t(i18ObjectPath(lang.menu.deviceList)),
    url: ROUTES.DEVICE_LIST
  }
];
