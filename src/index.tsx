import ReactDOM from "react-dom";
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider
} from "@material-ui/core";
import Router from "./router/Router";
import { RootStoreProvider } from "./providers/use-root-store";
import { RootStore } from "./stores/root-store";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { muiTheme, theme } from "./theme";
import i18n from "./translations/i18n";
import { I18nextProvider } from "react-i18next";

ReactDOM.render(
  <RootStoreProvider store={new RootStore()}>
    <StylesProvider injectFirst={true}>
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </I18nextProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  </RootStoreProvider>,
  document.getElementById("root")
);
