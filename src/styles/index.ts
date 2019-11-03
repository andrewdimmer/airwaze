import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme, Hidden } from "@material-ui/core";
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
    },
    mapContainerOuter: {
      position: "absolute",
      overflow: "hidden",
      width: "100vw",
      height: "100vh"
    },
    mapContainerInner: {
      overflow: "scroll",
      width: "110%",
      height: "110%",
      paddingRight: "16px",
      paddingBottom: "16px"
    },
    mapCanvas: {
      //marginTop: "25vh",
      marginBottom: "25vh",
      marginLeft: "auto",
      marginRight: "auto"
    },
    hidden: {
      display: "none"
    },
    dropdownContainer: {
      padding: "20px"
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  })
);

export const theme = THEME;
