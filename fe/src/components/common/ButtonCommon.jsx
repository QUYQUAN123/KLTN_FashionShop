import { styled } from "@mui/material";

export const ButtonCommon = styled("button")({
  border: "none",
  background: "#dd3333",
  fontSize: 16,
  color: "white",
  fontWeight: 600,
  transition: "all .3s ease",
  boxSizing: "border-box",
  padding: "8px 0.75em",

  "&:hover": {
    boxShadow: "inset 0 0 0 100px rgba(0,0,0,.2)",
  },
});
