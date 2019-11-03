import { createMuiTheme } from "@material-ui/core";
import { blue, indigo, red } from "@material-ui/core/colors";

export const THEME = createMuiTheme({
  palette: {
    primary: { main: "#B1DDF1" },
    secondary: blue,
    error: red
  }
});
