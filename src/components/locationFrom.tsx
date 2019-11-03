import { Grid, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import swal from "sweetalert";
import { fromDropdownList } from "../scripts/locationDropdowns";
interface FromProps {
  airports: Airport[];
  airport: Airport | null;
  from: { id: string; label: string } | null;
  classes: any;
  handleChangeAirport: (newAirport: Airport) => void;
  handleChangeFromId: (newFromId: { id: string; label: string } | null) => void;
}

const locationFrom: React.FunctionComponent<FromProps> = ({
  airports,
  airport,
  from,
  classes,
  handleChangeAirport,
  handleChangeFromId
}) => {
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      className={classes.lowerPadded}
    >
      <Grid item xs={12} sm={3} md={2}>
        <Typography variant="h6">From:</Typography>
      </Grid>
      <Grid item sm={7} xs={9} md={9}>
        <Grid container direction="column">
          <Grid item>
            <Autocomplete
              options={airports}
              getOptionLabel={(option: Airport) =>
                `${option.name} (${option.code})`
              }
              className={classes.lowerPadded}
              onChange={(event, value) => {
                handleChangeAirport(value);
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Airport"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              options={
                airport
                  ? fromDropdownList(airport)
                  : [{ label: "Please select an airport" }]
              }
              getOptionDisabled={(option: { id: string; label: string }) =>
                option.label === "Please select an airport"
              }
              getOptionLabel={(option: { id: string; label: string }) =>
                option.label
              }
              style={{ width: "100%" }}
              onChange={(event, value) => {
                handleChangeFromId(value);
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Location"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3} sm={2} md={1}>
        <img
          alt="Scan a QR Code"
          src="https://static.thenounproject.com/png/1433173-200.png"
          width="100%"
          onClick={() => {
            swal("This will be the QR Code Scanner");
          }}
        />
      </Grid>
    </Grid>
  );
};

export default locationFrom;
