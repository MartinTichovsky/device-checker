import { useRootStore } from "../providers/use-root-store";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import { loginRequest } from "../api/methods/login";
import React from "react";
import clsx from "clsx";
import { TextFieldStyled, useStyles } from "./Login.styles";
import {
  createProxy,
  i18ObjectPath,
  lastObjectProperty,
} from "proxy-object-path";
import lang from "../translations/lang";
import { useTranslation } from "react-i18next";

interface FormValues {
  login: string;
  password: string;
}

const formValuesProxy = createProxy<FormValues>();

const Login = () => {
  const [pending, setPending] = React.useState(false);
  const classes = useStyles();
  const store = useRootStore();
  const formValues = React.useRef<FormValues>({ login: "", password: "" });
  const { t } = useTranslation();

  const handleLogin = React.useCallback(() => {
    setPending(true);

    loginRequest({
      login: formValues.current.login,
      password: formValues.current.password,
      onFinally: () => {
        setPending(false);
      },
      onSuccess: (response) => {
        if (response) {
          store.setUser(response);
        }
      },
      store,
    });
  }, [setPending, store]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "80vh" }}
    >
      <Grid className={classes.container} item>
        <form noValidate autoComplete="off">
          <h1 className={classes.label}>
            {t(i18ObjectPath(lang.login.label))}
          </h1>
          <p className={classes.context}>{t(i18ObjectPath(lang.login.info))}</p>

          <TextFieldStyled
            label={t(i18ObjectPath(lang.login.formInputLogin))}
            name={lastObjectProperty(formValuesProxy.login)}
            onChange={(event) =>
              (formValues.current.login = event.currentTarget.value)
            }
          />
          <TextFieldStyled
            label={t(i18ObjectPath(lang.login.formInputPassword))}
            type="password"
            name={lastObjectProperty(formValuesProxy.password)}
            onChange={(event) =>
              (formValues.current.password = event.currentTarget.value)
            }
          />
          {pending ? (
            <Button className={clsx(classes.button, classes.loadingButton)}>
              <CircularProgress size={24} />
            </Button>
          ) : (
            <Button className={classes.button} onClick={() => handleLogin()}>
              {t(i18ObjectPath(lang.login.formButtonLogin))}
            </Button>
          )}
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
