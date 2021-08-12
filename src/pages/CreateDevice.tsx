import { Button, CircularProgress, Grid, MenuItem } from "@material-ui/core";
import clsx from "clsx";
import { i18ObjectPath } from "proxy-object-path";
import React from "react";
import { useTranslation } from "react-i18next";
import { createPhoneRequest } from "../api/methods/phones";
import { EditPhone, OsEnum } from "../api/types";
import { FormSelectField } from "../components/fields/FormSelectField";
import { FormTextField } from "../components/fields/FormTextField";
import { setFormValue, validateFields } from "../components/fields/helper";
import { FormStore } from "../components/fields/types";
import { useRootStore } from "../providers/use-root-store";
import lang from "../translations/lang";
import { useStyles } from "./CreateDevice.style";

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

interface State extends FormStore<EditPhone> {
	pending: boolean;
}

const requiredFields: (keyof EditPhone)[] = ["code", "model", "os", "vendor"];
const initialValues: State = { errors: [], pending: false, values: {} };

// TODO: rework how the form works to avoid re-rendering when a input value is changed
const CreateDevice = () => {
	const [state, setState] = React.useState<State>(initialValues);
	const classes = useStyles();
	const store = useRootStore();
	const { t } = useTranslation();

	const handleCreateDevice = React.useCallback(() => {
		const errors = validateFields(state.values, requiredFields);

		if (errors.length) {
			setState((prevState) => ({
				...prevState,
				errors,
			}));

			return;
		}

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
					setState(initialValues);
					store.notificationStore.addNotification({
						color: "success",
						message: t(i18ObjectPath(lang.createDevice.addedInfo)),
						severity: "success",
					});
				}
			},
			store,
		});
	}, [setState, store, t]);

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

					<FormTextField<EditPhone, State>
						fieldKey="code"
						label={t(i18ObjectPath(lang.createDevice.code))}
						onChange={(event) =>
							setFormValue<EditPhone, State>(
								setState,
								"code",
								event.currentTarget.value
							)
						}
						requiredFields={requiredFields}
						state={state}
					/>

					<FormSelectField<EditPhone, State>
						fieldKey="vendor"
						label={t(i18ObjectPath(lang.common.os))}
						onChange={(event) =>
							setFormValue<EditPhone, State>(
								setState,
								"vendor",
								event.target.value as string
							)
						}
						options={VendorList.map((vendor) => (
							<MenuItem key={vendor} value={vendor}>
								{vendor}
							</MenuItem>
						))}
						requiredFields={requiredFields}
						state={state}
					/>

					<FormTextField<EditPhone, State>
						fieldKey="model"
						label={t(i18ObjectPath(lang.createDevice.model))}
						onChange={(event) =>
							setFormValue<EditPhone, State>(
								setState,
								"model",
								event.currentTarget.value
							)
						}
						state={state}
						requiredFields={requiredFields}
					/>

					<FormSelectField<EditPhone, State>
						fieldKey="os"
						label={t(i18ObjectPath(lang.common.os))}
						onChange={(event) =>
							setFormValue<EditPhone, State>(
								setState,
								"os",
								event.target.value as string
							)
						}
						options={Object.keys(OsEnum).map((os) => (
							<MenuItem key={os} value={os}>
								{os}
							</MenuItem>
						))}
						requiredFields={requiredFields}
						state={state}
					/>

					<FormTextField<EditPhone, State>
						fieldKey="osVersion"
						label={t(i18ObjectPath(lang.createDevice.osVersion))}
						onChange={(event) =>
							setFormValue<EditPhone, State>(
								setState,
								"osVersion",
								event.currentTarget.value
							)
						}
						state={state}
						requiredFields={requiredFields}
					/>

					<FormTextField<EditPhone, State>
						fieldKey="image"
						label={t(i18ObjectPath(lang.createDevice.image))}
						onChange={(event) =>
							setFormValue<EditPhone, State>(
								setState,
								"image",
								event.currentTarget.value
							)
						}
						state={state}
						requiredFields={requiredFields}
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
