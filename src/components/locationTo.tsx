import { Typography, Grid, TextField } from "@material-ui/core";
import React, { Fragment } from "react";
import { Autocomplete } from "@material-ui/lab";
import CropFreeIcon from "@material-ui/icons/CropFree";
interface ToProps {
  airports: Airport[];
  airport: Airport | null;
  setAirport: Function;
  classes: any;
  toCategory: string;
  setToCategory: Function;
  toName: string;
  setToName: Function;
}

const locationTo: React.FunctionComponent<ToProps> = ({
  airports, //TODO make these autocompletes use the actual lists
  airport,
  setAirport,
  classes,
  toCategory,
  setToCategory,
  toName,
  setToName
}) => {
  const categories: string[] = [
    "Food",
    "Gate",
    "Hallway",
    "Information and Services",
    "Luggage Claim",
    "Parking and Transportation",
    "Restroom",
    "Shopping"
  ];
  return (
    <Grid container direction="row" alignItems="center">
      <Grid item xs={12} sm={3} md={2}>
        <Typography variant="h6">To:</Typography>
      </Grid>
      <Grid item sm={9} xs={12} md={10}>
        <Grid container direction="column">
          <Grid item>
            <Autocomplete
              options={categories}
              getOptionLabel={(option: string) => option}
              className={classes.lowerPadded}
              onChange={(event, value) => {
                setToCategory(value);
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Category"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              options={toCategory ? [] : ["Please select a category"]}
              getOptionDisabled={(option: any) =>
                option === "Please select a category"
              }
              getOptionLabel={(option: any) => option}
              style={{ width: "100%" }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Name"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default locationTo;
