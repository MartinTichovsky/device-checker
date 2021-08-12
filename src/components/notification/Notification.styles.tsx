import styled from "@emotion/styled";
import Snackbar from "@material-ui/core/Snackbar";

export const SnackbarLayout = styled(Snackbar)(() => ({
  bottom: 0,
  cursor: "default",
  display: "block",
  marginBottom: 10,
  marginRight: 10,
  maxWidth: 400,
  position: "relative",
}));
