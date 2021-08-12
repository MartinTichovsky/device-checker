import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { ROUTES } from "../router/routes";
import { Logo, LinkStyled, UserName, useStyles } from "./MenuBar.styles";
import { RootStore } from "../stores/root-store";
import { useRootStore } from "../providers/use-root-store";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { i18ObjectPath } from "proxy-object-path";
import lang from "../translations/lang";

const LogOut = (store: RootStore) => {
  store.setUser(null);
};

export interface MenuItemType {
  admin?: boolean;
  icon?: JSX.Element;
  label: string;
  url: string;
}

interface MenuItemProps {
  item: MenuItemType;
  toggleMenuOpen: () => void;
}

interface OwnProps {
  items?: MenuItemType[];
}

const MenuBar = ({ items }: OwnProps) => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const classes = useStyles();
  const store = useRootStore();
  const { t } = useTranslation();

  const toggleMenuOpen = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          {store.isAuthorized && items?.length && (
            <IconButton
              aria-label="menu"
              className={classes.menuButton}
              color="inherit"
              edge="start"
              onClick={toggleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Logo className={classes.title} />
          {store.isAuthorized ? (
            <>
              <UserName>{store.user?.login}</UserName>
              <Button
                className={classes.logout}
                disableElevation
                onClick={() => LogOut(store)}
                variant="contained"
              >
                {t(i18ObjectPath(lang.logout.label))}
              </Button>
            </>
          ) : (
            <LinkStyled to={{ pathname: ROUTES.LOGIN }}>
              {t(i18ObjectPath(lang.login.label))}
            </LinkStyled>
          )}
        </Toolbar>
      </AppBar>
      {items?.length && (
        <Drawer anchor="left" onClose={toggleMenuOpen} open={isMenuOpen}>
          <List>
            {items
              .filter(
                (item) => (item.admin && store.isUserAdmin) || !item.admin
              )
              .map((item, index) => (
                <MenuItem
                  item={item}
                  key={index}
                  toggleMenuOpen={toggleMenuOpen}
                />
              ))}
          </List>
        </Drawer>
      )}
    </>
  );
};

const MenuItem = ({ item, toggleMenuOpen }: MenuItemProps) => {
  return (
    <LinkStyled to={{ pathname: item.url }} onClick={toggleMenuOpen}>
      <ListItem button>
        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
        <ListItemText primary={item.label} />
      </ListItem>
    </LinkStyled>
  );
};

export default MenuBar;
