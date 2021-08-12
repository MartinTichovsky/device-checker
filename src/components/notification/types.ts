export interface NotificationType {
  alertTitle?: string | null;
  color?: "error" | "info" | "success" | "warning";
  hideDuration?: number;
  icon?: false | React.ReactNode;
  message: string | null;
  severity?: "error" | "info" | "success" | "warning";
  variant?: "filled" | "standard" | "outlined";
}
