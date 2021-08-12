import styled from "@emotion/styled";

export const CardContainer = styled("div")({
	alignItems: "end",
	display: "grid",
	gridGap: 20,
	gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
	padding: "10px 15px",
});

export const FilterBarStyled = styled("div")({
	padding: "10px 15px",
});

export const NoResults = styled("div")({
	color: "#777",
	marginTop: 50,
	textAlign: "center",
});
