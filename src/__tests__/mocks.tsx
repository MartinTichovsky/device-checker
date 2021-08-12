import { ThemeProvider } from "@emotion/react";
import { MuiThemeProvider, StylesProvider } from "@material-ui/core";
import { I18nextProvider } from "react-i18next";
import { RootStoreProvider } from "../providers/use-root-store";
import { RootStore } from "../stores/root-store";
import { muiTheme, theme } from "../theme";
import i18n from "../translations/i18n";

interface OwnProps {
  store?: RootStore;
}

export const MockedProviders = ({
  children,
  store
}: React.PropsWithChildren<OwnProps>) => (
  <RootStoreProvider store={store || new RootStore()}>
    <StylesProvider injectFirst={true}>
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  </RootStoreProvider>
);
