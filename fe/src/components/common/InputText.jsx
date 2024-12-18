import { styled } from "@mui/material";

export const InputText = styled("input")({
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  boxShadow: "inset 0 1px 2px rgba(0,0,0,.1)",
  color: "#333",
  minHeight: "2.8em",
  outline: "none",
  width: "100%",
  padding: "4px 0.75em",
  boxSizing: "border-box",
  "&:focus": {
    boxShadow: "0 0 5px #ccc",
  },
});
