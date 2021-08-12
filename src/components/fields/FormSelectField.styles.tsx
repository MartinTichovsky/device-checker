import styled from "@emotion/styled";
import { Select } from "@material-ui/core";

export const SelectStyled = styled(Select)({
	marginBottom: 20,
	padding: "5px 0",
	width: "100%",

	"~.Mui-required": {
		color: "#f44336",
		marginTop: -17,
		position: "absolute",
	},
});
