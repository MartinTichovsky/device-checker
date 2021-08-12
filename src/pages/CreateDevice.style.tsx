import { makeStyles, Theme } from "@material-ui/core";
import { ITheme } from "../theme";

export const useStyles = makeStyles((theme: Theme & ITheme) => ({
	button: {
		backgroundColor: theme.colors.primary,
		border: `1px solid ${theme.colors.primaryBorder}`,
		color: "#fff",
		marginTop: 10,
		width: "100%",

		"&:hover": {
			backgroundColor: theme.colors.primaryHover,
			border: `1px solid ${theme.colors.primaryHoverBorder}`,
		},
	},
	container: {
		backgroundColor: "#fff",
		borderRadius: 5,
		boxShadow:
			"0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%)",
		padding: 15,
		minWidth: 550,
	},
	context: {
		color: "#aaa",
		lineHeight: "1.5em",
	},
	grid: {
		minHeight: "90vh",
	},
	label: {
		fontWeight: 200,
		marginTop: 0,
	},
	loadingButton: {
		color: "#000",
		backgroundColor: "#eee",
		border: "1px solid #fff",

		"&:hover": {
			backgroundColor: "#eee",
			border: "1px solid #fff",
		},
	},
	selectPlaceHolder: {
		color: "red",
	},
}));
