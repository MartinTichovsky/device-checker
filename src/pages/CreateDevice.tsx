import { useRootStore } from "../providers/use-root-store";
import {
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import { SelectStyled, TextFieldStyled, useStyles } from "./CreateDevice.style";
import {
  createProxy,
  i18ObjectPath,
  lastObjectProperty,
} from "proxy-object-path";
import lang from "../translations/lang";
import { useTranslation } from "react-i18next";
import { EditPhone, OsEnum } from "../api/types";
import { createPhoneRequest } from "../api/methods/phones";

// this should come from the back-end, can't be hardcoded!
const VendorList = [
  "ACER",
  "APPLE",
  "ASUS",
  "HUAWEI",
  "LENOVO",
  "LG",
  "MOTOROLA",
  "SAMSUNG",
  "VODAFONE",
  "XIAOMI",
];

interface State {
  pending: boolean;
  values: EditPhone;
}

const formValuesProxy = createProxy<EditPhone>();

// TODO: rework how the form works to avoid re-rendering when a input value is changed

const setFormValue = (
  setState: React.Dispatch<React.SetStateAction<State>>,
  key: string,
  value: string
) => {
  setState((prevState) => ({
    ...prevState,
    values: {
      ...prevState.values,
      [key]: value,
    },
  }));
};

const CreateDevice = () => {
  const [state, setState] = React.useState<State>({
    pending: false,
    values: {},
  });
  const classes = useStyles();
  const store = useRootStore();
  const { t } = useTranslation();

  const handleCreateDevice = React.useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      pending: true,
    }));

    createPhoneRequest({
      body: state.values,
      onError: () => {
        setState((prevState) => ({
          ...prevState,
          pending: false,
        }));
      },
      onSuccess: (response) => {
        if (response) {
          setState({
            pending: false,
            values: {},
          });
          store.notificationStore.addNotification({
            color: "success",
            message: t(i18ObjectPath(lang.createDevice.addedInfo)),
            severity: "success",
          });
        }
      },
      store,
    });
  }, [setState, store]);

  return (
    <Grid
      className={classes.grid}
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid className={classes.container} item>
        <form noValidate autoComplete="off">
          <h1 className={classes.label}>
            {t(i18ObjectPath(lang.createDevice.label))}
          </h1>

          <TextFieldStyled
            label={t(i18ObjectPath(lang.createDevice.code))}
            onChange={(event) =>
              setFormValue(
                setState,
                lastObjectProperty(formValuesProxy.code),
                event.currentTarget.value
              )
            }
            value={state.values.code || ""}
          />
          <span>
            <InputLabel shrink={true} htmlFor="create-device-vendor-label">
              {t(i18ObjectPath(lang.common.vendor))}
            </InputLabel>
            <SelectStyled
              labelId="create-device-vendor-label"
              onChange={(event) =>
                setFormValue(
                  setState,
                  lastObjectProperty(formValuesProxy.vendor),
                  event.target.value as string
                )
              }
              value={state.values.vendor || ""}
            >
              {VendorList.map((vendor) => (
                <MenuItem key={vendor} value={vendor}>
                  {vendor}
                </MenuItem>
              ))}
            </SelectStyled>
          </span>
          <TextFieldStyled
            label={t(i18ObjectPath(lang.createDevice.model))}
            onChange={(event) =>
              setFormValue(
                setState,
                lastObjectProperty(formValuesProxy.model),
                event.currentTarget.value
              )
            }
            value={state.values.model || ""}
          />
          <span>
            <InputLabel shrink={true} htmlFor="create-device-os-label">
              {t(i18ObjectPath(lang.common.os))}
            </InputLabel>
            <SelectStyled
              labelId="create-device-os-label"
              onChange={(event) =>
                setFormValue(
                  setState,
                  lastObjectProperty(formValuesProxy.os),
                  event.target.value as string
                )
              }
              value={state.values.os || ""}
            >
              {Object.keys(OsEnum).map((os) => (
                <MenuItem key={os} value={os}>
                  {os}
                </MenuItem>
              ))}
            </SelectStyled>
          </span>
          <TextFieldStyled
            label={t(i18ObjectPath(lang.createDevice.osVersion))}
            onChange={(event) =>
              setFormValue(
                setState,
                lastObjectProperty(formValuesProxy.osVersion),
                event.currentTarget.value
              )
            }
            value={state.values.osVersion || ""}
          />
          <TextFieldStyled
            label={t(i18ObjectPath(lang.createDevice.image))}
            onChange={(event) =>
              setFormValue(
                setState,
                lastObjectProperty(formValuesProxy.image),
                event.currentTarget.value
              )
            }
            value={state.values.image || ""}
          />
          {state.pending ? (
            <Button className={clsx(classes.button, classes.loadingButton)}>
              <CircularProgress size={24} />
            </Button>
          ) : (
            <Button className={classes.button} onClick={handleCreateDevice}>
              {t(i18ObjectPath(lang.createDevice.addDevice))}
            </Button>
          )}
        </form>
      </Grid>
    </Grid>
  );
};

export default CreateDevice;
