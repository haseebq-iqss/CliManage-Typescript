import { createTheme } from "@mui/material";

export const MuiTheme = createTheme({
  palette: {
    primary: {
      dark: "#0e1111",
      light: "#414a4c",
      main: "#353839",
    },
  },
  typography: {
    fontFamily: "Inter",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
});
