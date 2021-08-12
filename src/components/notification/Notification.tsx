import MuiAlert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import React from "react";
import { SnackbarLayout } from "./Notification.styles";
import { NotificationType } from "./types";

interface OwnProps extends NotificationType {
  onClose: () => void;
}

const Notification = ({
  alertTitle = null,
  color,
  hideDuration = 3000,
  icon = true,
  message,
  onClose,
  severity = "success",
  variant = "filled"
}: OwnProps) => {
  const [open, setOpen] = React.useState(true);
  const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    onClose();
  };

  return (
    <SnackbarLayout
      autoHideDuration={hideDuration}
      onClose={handleClose}
      open={open}
    >
      <MuiAlert
        {...(color && { color })}
        elevation={6}
        {...(icon && icon !== true && { icon })}
        onClose={handleClose}
        severity={severity}
        variant={variant}
      >
        {alertTitle && <AlertTitle>{alertTitle}</AlertTitle>}
        {message}
      </MuiAlert>
    </SnackbarLayout>
  );
};

export default Notification;
