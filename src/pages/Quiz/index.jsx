import React from "react";
import { makeStyles } from "@material-ui/core";
import Stepper from "./Stepper";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(5)}px ${theme.spacing(5)}px ${theme.spacing(5)}px`
  },
  container: {
    maxWidth: "200px"
  }
}));

const InputForm = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Paper>
        <Stepper />
      </Paper>
    </React.Fragment>
  );
};

export default InputForm;
