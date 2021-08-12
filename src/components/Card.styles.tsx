import styled from "@emotion/styled";
import { WithITheme } from "../theme";

export const ButtonLayout = styled("div")<WithITheme>(({ theme }) => ({
  bottom: 5,
  display: "block",
  left: "50%",
  position: "absolute",
  transform: "translateX(-50%)",
  width: "95%",

  button: {
    backgroundColor: theme.colors.primary,
    border: `1px solid ${theme.colors.primaryBorder}`,
    borderRadius: "2px",
    color: "#fff",
    cursor: "pointer",
    padding: "7px 0",
    position: "relative",
    textTransform: "uppercase",
    width: "100%",

    "&[disabled]": {
      backgroundColor: "#eee",
      border: "1px solid #eee",
      color: "#888",
      cursor: "default"
    },

    "&:hover:enabled": {
      backgroundColor: theme.colors.primaryHover,
      border: `1px solid ${theme.colors.primaryHoverBorder}`
    }
  }
}));

export const CardStyled = styled("div")({
  backgroundColor: "#fff",
  boxShadow:
    "0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%)",
  height: 300,
  paddingTop: 10,
  position: "relative",
  textAlign: "center"
});

export const Description = styled("div")({
  color: "#999",
  fontSize: ".7em",
  overflow: "hidden",
  padding: "5px 10px",
  textAlign: "left",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
});

export const Image = styled("img")({
  display: "block",
  height: 150,
  margin: "auto auto"
});

export const Label = styled("div")({
  color: "#777",
  fontSize: ".9em",
  fontWeight: "bold",
  marginTop: 25,
  overflow: "hidden",
  paddingLeft: 10,
  textAlign: "left",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
});

export const NotAvailable = styled("div")({
  backgroundColor: "rgba(0,0,0,.7)",
  color: "#fff",
  position: "absolute",
  fontSize: ".9em",
  marginTop: -35,
  overflow: "hidden",
  padding: "10px 0",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  width: "100%",

  span: {
    padding: "0 5px"
  }
});

export const Title = styled("h3")({
  color: "#555",
  fontSize: "1.1em",
  margin: 0,
  overflow: "hidden",
  padding: "10px 10px 0 10px",
  textAlign: "left",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
});
