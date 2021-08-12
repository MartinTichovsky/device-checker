import styled from "@emotion/styled";
import { makeStyles } from "@material-ui/core/styles";

export const CenterImage = styled("div")({
  left: "50%",
  position: "fixed",
  top: "50%",
});

export const Content = styled("div")({
  top: 70,
  position: "relative",
});

export const useStyles = makeStyles(() => ({
  loading: {
    backgroundColor: "rgba(200, 200, 200, .8)",
    display: "none",
    bottom: 0,
    left: 0,
    position: "fixed",
    right: 0,
    top: 0,
  },
  root: {
    flexGrow: 1,
  },
}));
