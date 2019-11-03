import React from "react";
import "./App.css";
import {
  Grid,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Modal,
  Backdrop,
  Fade,
  Fab
} from "@material-ui/core";
import LocationFrom from "./components/locationFrom";
import { styles } from "./styles";
import SquarePortData from "./data/TEST.json";
import DTWData from "./data/DTW.json";
import LocationTo from "./components/locationTo";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CssBaseline from "@material-ui/core/CssBaseline";
import MapCanvas from "./components/mapCanvas";
import QrReader from "react-qr-reader";
import swal from "sweetalert";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CropFreeIcon from "@material-ui/icons/CropFree";
import BugReportIcon from "@material-ui/icons/BugReport";

const airports: Airport[] = [SquarePortData, DTWData];

const App: React.FC = () => {
  const [airport, setAirport] = React.useState<Airport | null>(null);
  const [from, setFrom] = React.useState<{ id: string; label: string } | null>(
    null
  );
  const [toCategory, setToCategory] = React.useState<string>("");
  const [toName, setToName] = React.useState<string>("");
  const [expand, setExpand] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState(false);
  const [scaleFactor, setScaleFactor] = React.useState(1);
  const [debugInfo, setDebugInfo] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeAirport = (newAirport: Airport) => {
    setAirport(newAirport);
    setFrom(null);
    setToName("");
    setScaleFactor(
      Math.min(1, newAirport ? window.innerWidth / newAirport.scale1width : 1)
    );
  };

  const handleChangeFromId = (
    newFromId: { id: string; label: string } | null
  ) => {
    console.log(newFromId);
    setFrom(newFromId);
  };
  const handleChangeToCategory = (newToCategory: string) => {
    setToCategory(newToCategory);
    setToName("");
    if (newToCategory === "Restroom") {
      setToName("Restroom");
    }
  };
  const handleChangeToName = (newToName: string) => {
    setToName(newToName);
  };

  const handleError = (err: any) => {
    swal(err);
  };

  const handleScan = (data: any) => {
    if (data) {
      handleChangeAirport(
        data.slice(0, data.indexOf("_")) === "TEST" ? airports[0] : airports[1]
      );
      handleChangeFromId({
        id: data.slice(data.indexOf("_") + 1, data.indexOf("-")),
        label: data.slice(data.indexOf("-") + 1, data.length - 1)
      });
      //setFrom();
      handleClose();
      swal(
        "Scanned Succesfully",
        "The dropdowns will not update, but the data has been entered, please slect your destination.",
        "success"
      );
    }
  };

  const classes = styles();
  return (
    <div className={classes.mapContainerOuter}>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <div
            style={{
              width: "60%"
            }}
          >
            <Fade in={open}>
              <QrReader
                delay={300}
                onError={(err: any) => {
                  handleError(err);
                }}
                onScan={(data: any) => {
                  handleScan(data);
                }}
              />
            </Fade>
          </div>
        </Modal>
      </div>
      <CssBaseline />

      <div className={classes.dropdownContainer}>
        <ExpansionPanel expanded={expand}>
          <ExpansionPanelSummary
            className={classes.gradient}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={() => {
              setExpand(!expand);
            }}
          >
            <Typography variant="h5">
              {!expand && from && toName
                ? `From: ${from.label} To: ${toName}`
                : "Locations"}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid
              container
              direction="row"
              justify="center"
              style={{ width: "100%" }}
            >
              <Grid item xs={12} md={6}>
                <LocationFrom
                  airports={airports}
                  airport={airport}
                  from={from}
                  classes={classes}
                  handleChangeAirport={handleChangeAirport}
                  handleChangeFromId={handleChangeFromId}
                  handleOpen={handleOpen}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <LocationTo
                  airport={airport}
                  classes={classes}
                  toCategory={toCategory}
                  toName={toName}
                  handleChangeToCategory={handleChangeToCategory}
                  handleChangeToName={handleChangeToName}
                />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      <MapCanvas
        airport={airport}
        classes={classes}
        fromId={from ? from.id : ""}
        toName={toName}
        debug={debugInfo}
        scaleFactor={scaleFactor}
      />
      {airport && !expand && (
        <div className={classes.zoomContainer}>
          <Fab
            color="primary"
            className={classes.zoomButton}
            onClick={() => {
              setScaleFactor(scaleFactor * 1.1);
            }}
          >
            <AddIcon />
          </Fab>
          <Fab
            color="primary"
            className={classes.zoomButton}
            onClick={() => {
              setScaleFactor(scaleFactor * 0.9);
            }}
          >
            <RemoveIcon />
          </Fab>
          <Fab
            color="primary"
            className={classes.zoomButton}
            onClick={() => {
              setScaleFactor(
                Math.min(
                  1,
                  airport ? window.innerWidth / airport.scale1width : 1
                )
              );
            }}
          >
            <CropFreeIcon />
          </Fab>
          <Fab
            color="primary"
            className={classes.zoomButton}
            onClick={() => {
              setDebugInfo(!debugInfo);
            }}
          >
            <BugReportIcon />
          </Fab>
        </div>
      )}
    </div>
  );
};

export default App;
