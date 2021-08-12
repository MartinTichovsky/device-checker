import React from "react";
import Notifications from "./notification/Notifications";
import { CenterImage, Content, useStyles } from "./Layout.styles";
import MenuBar from "./MenuBar";
import { CircularProgress } from "@material-ui/core";
import { useRootStore } from "../providers/use-root-store";
import { menuItems } from "../menu-items";

const Layout = (props: React.PropsWithChildren<{}>) => {
  const classes = useStyles();
  const store = useRootStore();

  const loadingRef = React.useRef<HTMLDivElement>(null);
  store.setLoadingRef(loadingRef);

  return (
    <>
      <div className={classes.root}>
        <MenuBar items={menuItems} />
        <div className={classes.loading} ref={loadingRef}>
          <CenterImage>
            <CircularProgress />
          </CenterImage>
        </div>
        <Content>{props.children}</Content>
      </div>
      <Notifications />
    </>
  );
};

export default Layout;
