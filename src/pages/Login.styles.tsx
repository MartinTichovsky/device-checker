import styled from "@emotion/styled";
import { makeStyles, TextField, Theme } from "@material-ui/core";
import { ITheme } from "../theme";

export const TextFieldStyled = styled(TextField)({
  display: "block",
  marginBottom: 15,
  width: "100%",

  "> .MuiFormLabel-root": {
    color: "rgba(0, 0, 0, 0.40)"
  },

  "> .MuiInput-root": {
    width: "100%"
  },

  ".MuiInput-underline:before": {
    borderBottom: "1px solid rgba(0, 0, 0, 0.30)"
  },

  ".MuiInput-input": {
    padding: "10px 7px"
  }
});

export const useStyles = makeStyles((theme: Theme & ITheme) => ({
  button: {
    backgroundColor: theme.colors.primary,
    border: `1px solid ${theme.colors.primaryBorder}`,
    color: "#fff",
    marginTop: 10,
    width: "100%",

    "&:hover": {
      backgroundColor: theme.colors.primaryHover,
      border: `1px solid ${theme.colors.primaryHoverBorder}`
    }
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 5,
    boxShadow:
      "0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%)",
    padding: 15
  },
  context: {
    color: "#aaa",
    lineHeight: "1.5em"
  },
  grid: {
    minHeight: "80vh"
  },
  label: {
    fontWeight: 200,
    marginTop: 0
  },
  loadingButton: {
    color: "#000",
    backgroundColor: "#eee",
    border: "1px solid #fff",

    "&:hover": {
      backgroundColor: "#eee",
      border: "1px solid #fff"
    }
  }
}));
