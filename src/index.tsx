import ReactDOM from "react-dom";
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core";
import Router from "./router/Router";
import { RootStoreProvider } from "./providers/use-root-store";
import { RootStore } from "./stores/root-store";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { muiTheme, theme } from "./theme";
import "./translations/i18n";

ReactDOM.render(
  <RootStoreProvider store={new RootStore()}>
    <StylesProvider injectFirst={true}>
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  </RootStoreProvider>,
  document.getElementById("root")
);
