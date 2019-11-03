import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { THEME } from "./theme";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    padded: {
      padding: theme.spacing(2)
    },
    margined: {
      margin: theme.spacing(2)
    },
    topMargined: {
      marginTop: theme.spacing(2)
    },
    lowerPadded: {
      width: "100%",
      paddingBottom: "5%"
    },
    gradient: {
      background:
        "linear-gradient(75deg, rgba(177,221,241,1) 0%, rgba(220,194,237,1) 100%)"
    }
  })
);

export const theme = THEME;
