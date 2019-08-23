import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "./Button";
import styled from "styled-components";
import { useContext } from "react";
import AuthContext from "../store/createContext";
import { callAPI } from "../helpers/api";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing(0.5)
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));
export default function SendRequestDialog() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  function handleDateChange(date) {
    setSelectedDate(date);
  }
  const { user } = useContext(AuthContext);
  console.log("Context user:", user);

  const [values, setValues] = React.useState({});

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const [chipData, setChipData] = React.useState([
    { key: 0, label: "beloved sushi 5" },
    { key: 1, label: "new dish" },
    { key: 2, label: "family size dishes" },
    { key: 3, label: "lucky dish" },
    { key: 4, label: "Six dish" }
  ]);
  const handleDelete = chipToDelete => () => {
    setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
  };
  async function onSubmitAttempt(e) {
    e.preventDefault();
    try {
      // TODO: submit order and redirect to checkout page
      // const newdish = await callAPI({
      //   endpoint: "dish",
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: values,
      //   token: user.token
      // });
      // console.log("New dish from put", newdish);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Button onClick={handleClickOpen}> Send Request</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Send Request</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To request a chef, please fill in the form and click submit button.
          </DialogContentText>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change time"
              }}
            />
          </MuiPickersUtilsProvider>
          <TextField
            autoFocus
            margin="dense"
            id="serve"
            label="How many people will the chef serve?"
            type="number"
            value={values.numPeopleServed}
            onChange={handleChange("numPeopleServed")}
            fullWidth
          />
          <Paper className={classes.root}>
            {chipData.map(data => {
              let icon;

              return (
                <Chip
                  key={data.key}
                  icon={icon}
                  label={data.label}
                  onDelete={handleDelete(data)}
                  className={classes.chip}
                />
              );
            })}
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmitAttempt} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
