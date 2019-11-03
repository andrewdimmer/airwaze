import React from "react";
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
import testData from "./data/TEST.json";
import LocationTo from "./components/locationTo";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CssBaseline from "@material-ui/core/CssBaseline";

const airports: Airport[] = [
  (testData as unknown) as Airport,
  { name: "Detroit Metro", code: "DTW", points: {} }
];

const containerDivStyle = {
  width: "90%",
  margin: "5%"
};

const App: React.FC = () => {
  const [airport, setAirport] = React.useState<Airport | null>(null);
  const [fromID, setFromID] = React.useState<string>("");
  const [toCategory, setToCategory] = React.useState<string>("");
  const [toName, setToName] = React.useState<string>("");
  const [expand, setExpand] = React.useState<boolean>(true);
  const classes = styles();
  return (
    <div className="App" style={containerDivStyle}>
      <CssBaseline />
      <ExpansionPanel expanded={expand}>
        <ExpansionPanelSummary
          style={{}}
          className={classes.gradient}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={() => {
            setExpand(!expand);
          }}
        >
          <Typography variant="h5">
            {!expand && fromID && toName
              ? `From: ${fromID} To: ${toName}`
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
                setAirport={setAirport}
                classes={classes}
                fromID={fromID}
                setFromID={setFromID}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LocationTo
                airports={airports}
                airport={airport}
                setAirport={setAirport}
                classes={classes}
                toCategory={toCategory}
                setToCategory={setToCategory}
                toName={toName}
                setToName={setToName}
              />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default App;
