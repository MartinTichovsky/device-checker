import styled from "@emotion/styled";
import { TextField } from "@material-ui/core";

export const TextFieldStyled = styled(TextField)({
  display: "block",
  marginBottom: 25,
  width: "100%",

  "> .Mui-required": {
    position: "absolute",
  },

  "> .MuiFormLabel-root": {
    color: "rgba(0, 0, 0, 0.40)",
  },

  "> .MuiInput-root": {
    width: "100%",
  },

  ".MuiInput-underline:before": {
    borderBottom: "1px solid rgba(0, 0, 0, 0.30)",
  },

  ".MuiInput-input": {
    padding: "10px 0",
  },
});
