import styled from "@emotion/styled";
import { makeStyles, TextField } from "@material-ui/core";

export const FilterContainer = styled("div")({
  columnGap: "3em",
  display: "flex",

  "@media (max-width: 1600px)": {
    columnGap: "3vw"
  }
});

export const FilterItem = styled("div")<{ width?: number | string }>(
  ({ width }) => ({
    alignSelf: "flex-end",
    border: 0,
    display: "inline-flex",
    flexDirection: "column",
    padding: 0,
    position: "relative",
    margin: 0,
    width
  })
);

export const TextFieldStyled = styled(TextField)({
  alignSelf: "flex-end",
  marginLeft: "auto"
});

export const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));
