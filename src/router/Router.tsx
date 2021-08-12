import { FALLBACK_ROUTE, ROUTES } from "./routes";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  RouteComponentProps,
} from "react-router-dom";
import Login from "../pages/Login";
import DeviceList from "../pages/DeviceList";
import { rootStoreContext } from "../providers/use-root-store";
import CreateDevice from "../pages/CreateDevice";
import Layout from "../components/Layout";
import React from "react";
import { withRouter } from "react-router";
import { observer } from "mobx-react";

@observer
class Router extends React.Component<RouteComponentProps> {
  static contextType = rootStoreContext;
  context: React.ContextType<typeof rootStoreContext>;

  componentDidUpdate(prevProps: RouteComponentProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    this.context?.hideLoading();
  }

  render() {
    const store = this.context;

    if (!store?.isPersisted) {
      return null;
    }

    if (!store?.isAuthorized) {
      return (
        <BrowserRouter>
          <UseLayout component={<Login />} />
        </BrowserRouter>
      );
    }

    return (
      <Switch>
        <Route
          exact={true}
          children={<UseLayout component={<DeviceList />} />}
          path={ROUTES.DEVICE_LIST}
        />
        {store?.isUserAdmin && (
          <Route
            exact={true}
            children={<UseLayout component={<CreateDevice />} />}
            path={ROUTES.CREATE_DEVICE}
          />
        )}
        <Redirect to={FALLBACK_ROUTE} />
      </Switch>
    );
  }
}

const UseLayout = ({ component }: { component: JSX.Element }) => (
  <Layout>{component}</Layout>
);

export default withRouter(Router);
