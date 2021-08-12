import styled from "@emotion/styled";

export const NotificationLayout = styled("div")(() => ({
  ".MuiSnackbar-root:not(:last-child)": {
    marginBottom: 15
  },
  bottom: 0,
  position: "fixed",
  right: 0
}));
