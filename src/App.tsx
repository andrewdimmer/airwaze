import React, { Fragment } from "react";
import "./App.css";
import {
  Grid,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import LocationFrom from "./components/locationFrom";
import { styles } from "./styles";
import SquarePortData from "./data/TEST.json";
import DTWData from "./data/DTW.json";
import LocationTo from "./components/locationTo";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CssBaseline from "@material-ui/core/CssBaseline";
import MapCanvas from "./components/mapCanvas";

const airports: Airport[] = [SquarePortData, DTWData];

const App: React.FC = () => {
  const [airport, setAirport] = React.useState<Airport | null>(null);
  const [from, setFrom] = React.useState<{ id: string; label: string } | null>(
    null
  );
  const [toCategory, setToCategory] = React.useState<string>("");
  const [toName, setToName] = React.useState<string>("");
  const [expand, setExpand] = React.useState<boolean>(true);

  const handleChangeAirport = (newAirport: Airport) => {
    setAirport(newAirport);
    setFrom(null);
    setToName("");
  };

  const handleChangeFromId = (
    newFromId: { id: string; label: string } | null
  ) => {
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

  const classes = styles();
  return (
    <div className={classes.mapContainerOuter}>
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
        debug={true}
        scaleFactor={Math.min(
          1,
          airport ? window.innerWidth / airport.scale1width : 1
        )}
      />
    </div>
  );
};

export default App;
