import { ThemeOptions } from "@mui/material";

const lightTheme: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#992049", // header background colour
    },
    secondary: {
      main: "#dcbfc9",
    },
    info: {
      main: "#dcbfc9", // card background colour
      contrastText: "#808080", // card border colour
    },
    background: {
      default: "#dddddd", // page background colour
    },
  },
};

export default lightTheme;
