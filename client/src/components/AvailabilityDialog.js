import React, { useState, useContext } from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import AuthContext from "../store/createContext";
import { callAPI } from "../helpers/api";
import { colors } from "../themes/theme";
import Button from "./Button";

const DayContainer = styled.li`
  padding-top: 5px;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  width: 120px;
  user-select: none;

  span {
    display: block;
    padding: 10px;
  }

  .dayName {
    margin-bottom: 30px;
    background-color: ${colors.brand};
    color: white;
  }

  .label {
    position: relative;
    font-size: 0.7rem;
    color: black;
    text-transform: uppercase;
    bottom: 17px;
    pointer-events: none;

    font-weight: bold;
  }

  ul {
    padding: 0px;
    list-style: none;
    display: grid;
    grid-template-rows: repeat(14, 1fr);
    /* grid-gap: 3px; */

    li:nth-child(1) {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }

    li[data-hour="5"] {
      border-bottom: 1px dotted ${colors.brandLight};
    }

    li[data-hour="6"] {
      span {
        color: ${colors.brand};
        font-weight: bold;
        font-size: 0.8rem;
      }
    }

    li {
      height: 30px;
      background-color: white;
      border-bottom: 1px dotted rgba(0, 0, 0, 0.1);
      transition: all 100ms;
      cursor: pointer;

      &:hover {
        box-shadow: inset 0px 0px 1px 3px ${colors.brandLightTransprt};
      }
    }

    li.available {
      background-color: ${colors.brandLightTransprt};

      &:hover {
        box-shadow: none;
      }
    }
  }
`;

const PickerContainer = styled.ul`
  padding: 0px;
  position: relative;
  list-style: none;
  display: inline-flex;
  box-shadow: 0px 0px 10px -5px ${colors.brandLight},
    0px 5px 10px rgba(0, 0, 0, 0.1);
  button {
    position: absolute;
    top: 300px;
    right: -200px;
  }
`;

const AvailabilityDialog = ({
  startHourMilitary,
  endHourMilitary,
  handleSubmit
}) => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  async function onSubmitAttempt(e) {
    e.preventDefault();

    try {
      const res = await callAPI({
        endpoint: `chef`,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: convert(daysOfTheWeek, startHourMilitary),
        token: user.token,
        isForm: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  const initialAvailability = Array(endHourMilitary - startHourMilitary)
    .fill(0)
    .map(() => false);

  const [daysOfTheWeek, setDaysOfTheWeek] = useState({
    Sunday: initialAvailability,
    Monday: initialAvailability,
    Tuesday: initialAvailability,
    Wednesday: initialAvailability,
    Thursday: initialAvailability,
    Friday: initialAvailability,
    Saturday: initialAvailability
  });
  const [isSelecting, setSelecting] = useState(false);
  const [isDeselecting, setDeselecting] = useState(false);

  const indexToHour = i => {
    return startHourMilitary + i;
  };

  const onMouseDown = e => {
    const { day, hour } = e.target.dataset;

    if (e.target.classList.contains("available")) {
      deselectHour(day, hour);
      setDeselecting(true);
    } else {
      selectHour(day, hour);
      setSelecting(true);
    }
  };
  const onMouseUp = e => {
    setSelecting(false);
    setDeselecting(false);
  };

  const updateDay = (dayName, update) => {
    setDaysOfTheWeek({ ...daysOfTheWeek, [dayName]: update });
  };

  function selectHour(dayName, hour) {
    console.log(`daysOfTheWeek: ${daysOfTheWeek}`);
    console.log(`dayName: ${dayName}`);

    const newAvailibility = [...daysOfTheWeek[dayName]];

    newAvailibility[hour] = true;

    updateDay(dayName, newAvailibility);
  }

  function deselectHour(dayName, hour) {
    const newAvailibility = [...daysOfTheWeek[dayName]];

    newAvailibility[hour] = false;

    updateDay(dayName, newAvailibility);
  }

  const onMouseEnter = e => {
    const { hour, day } = e.target.dataset;

    if (isSelecting) {
      console.log("isSelecting");
      selectHour(day, hour);
    } else if (isDeselecting) {
      console.log("isDeselecting");
      deselectHour(day, hour);
    }
  };

  const daysComponents = Object.entries(daysOfTheWeek).map(([key, value]) => (
    <DayContainer>
      <span className="dayName">{key}</span>
      <ul>
        {value.map((isAvail, i) => (
          <li
            data-hour={i}
            data-day={key}
            onMouseEnter={onMouseEnter}
            onMouseDown={onMouseDown}
            className={isAvail && "available"}
          >
            <span className="label">
              {militaryToStandardTimeString(indexToHour(i))}
            </span>
          </li>
        ))}
      </ul>
    </DayContainer>
  ));

  return (
    <div>
      <Button onClick={handleClickOpen}>Set Weekly Availability</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        onMouseUp={onMouseUp}
        aria-labelledby="form-dialog-title"
        fullScreen
      >
        <DialogTitle id="form-dialog-title">
          Select Your Availability
        </DialogTitle>
        <DialogContent style={{ display: "flex", justifyContent: "center" }}>
          <PickerContainer>{daysComponents}</PickerContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmitAttempt}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AvailabilityDialog;

function militaryToStandardTimeString(h) {
  let returnStr = "";

  if (h === 0) returnStr = "12:00";
  else if (h <= 12) returnStr = `${h}:00`;
  else returnStr = `${h - 12}:00`;

  return h < 12 ? returnStr + "am" : returnStr + "pm";
}

function convert(week, startHourMilitary) {
  return JSON.stringify(
    Object.entries(week).map(([key, val]) => {
      return {
        day: key,
        availability: convertDayToAvailabilityRanges(val, startHourMilitary)
      };
    })
  );
}

function convertDayToAvailabilityRanges(hourFlagFormat, startHourMilitary) {
  function toHour(flagIndex) {
    return flagIndex + startHourMilitary;
  }

  const returnArr = [];

  let buffer = [];
  for (let i = 0; i < hourFlagFormat.length; i++) {
    if (hourFlagFormat[i]) {
      if (buffer.length > 1) {
        buffer[buffer.length - 1] = toHour(i);
      } else {
        buffer.push(toHour(i));
      }
    } else if (buffer.length > 0) {
      returnArr.push([...buffer]);
      buffer = [];
    }
  }

  if (buffer.length > 0) returnArr.push(buffer);

  return returnArr;
}
