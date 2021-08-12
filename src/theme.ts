import { createTheme } from "@material-ui/core";

export type WithITheme = {
  theme?: ITheme;
};

export interface ITheme {
  colors: {
    primary: string;
    primaryBorder: string;
    primaryHover: string;
    primaryHoverBorder: string;
  };
}

export const theme: ITheme = {
  colors: {
    primary: "#ed5b2f",
    primaryBorder: "#ec8566",
    primaryHover: "#c13d15",
    primaryHoverBorder: "#d26342",
  },
};

export const muiTheme = {
  ...createTheme(),
  ...theme,
};
