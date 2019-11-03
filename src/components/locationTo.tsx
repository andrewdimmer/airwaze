import { Grid, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import { toDropdownList } from "../scripts/locationDropdowns";

interface ToProps {
  airport: Airport | null;
  classes: any;
  toCategory: string;
  toName: string;
  handleChangeToCategory: (newToCategory: string) => void;
  handleChangeToName: (newToName: string) => void;
}

const locationTo: React.FunctionComponent<ToProps> = ({
  airport,
  classes,
  toCategory,
  toName,
  handleChangeToCategory,
  handleChangeToName
}) => {
  const categories: string[] = [
    "Food",
    "Gate",
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
                handleChangeToCategory(value);
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
              options={
                toCategory && airport
                  ? toDropdownList(airport, toCategory)
                  : ["Please select an airport and category"]
              }
              getOptionDisabled={(option: any) =>
                option === "Please select an airport and category"
              }
              getOptionLabel={(option: any) => option}
              style={{ width: "100%" }}
              onChange={(event, value) => {
                handleChangeToName(value);
              }}
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
