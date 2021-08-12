import AddIcon from "@material-ui/icons/Add";
import ViewListIcon from "@material-ui/icons/ViewList";
import { MenuItemType } from "./components/MenuBar";
import { ROUTES } from "./router/routes";

export const menuItems: MenuItemType[] = [
  {
    admin: true,
    icon: <AddIcon />,
    label: "Create device",
    url: ROUTES.CREATE_DEVICE,
  },
  {
    icon: <ViewListIcon />,
    label: "Device List",
    url: ROUTES.DEVICE_LIST,
  },
];
