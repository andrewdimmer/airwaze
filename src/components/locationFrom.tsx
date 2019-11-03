import { Typography, Grid, TextField } from "@material-ui/core";
import React, { Fragment } from "react";
import { Autocomplete } from "@material-ui/lab";
import CropFreeIcon from "@material-ui/icons/CropFree";
import swal from "sweetalert";
interface FromProps {
  airports: Airport[];
  airport: Airport | null;
  setAirport: Function;
  classes: any;
  fromID: string;
  setFromID: Function;
}

const locationFrom: React.FunctionComponent<FromProps> = ({
  airports,
  airport,
  setAirport,
  classes,
  fromID,
  setFromID
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
              getOptionLabel={(option: Airport) => option.name}
              className={classes.lowerPadded}
              onChange={(event, value) => {
                setAirport(value);
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
              options={airport ? [] : [{ label: "Please select an airport" }]}
              getOptionDisabled={(option: any) =>
                option.label === "Please select an airport"
              }
              getOptionLabel={(option: any) => option.label}
              style={{ width: "100%" }}
              onChange={(event, value) => {
                setFromID(value);
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
