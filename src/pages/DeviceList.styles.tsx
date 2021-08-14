import styled from "@emotion/styled";

export const CardContainer = styled("div")({
  alignItems: "end",
  display: "grid",
  gridGap: 20,
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  padding: "10px 15px"
});

export const FilterBarStyled = styled("div")({
  backgroundColor: "#ededed",
  padding: "10px 15px",
  position: "sticky",
  top: 63,
  zIndex: 1
});

export const NoResults = styled("div")({
  color: "#777",
  marginTop: 50,
  textAlign: "center"
});
