import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "./Button";
import styled from "styled-components";

export default function AdddishDialog({  }) {
    const [open, setOpen] = React.useState(false);
    const AddDishBtn = styled(Button)`
        display:block;
        width:100%;
        margin:10px;
    `;
    function handleClickOpen() {
        setOpen(true);
      }
    
      function handleClose() {
        setOpen(false);
      }
  
  
    return (

    <div>
        <AddDishBtn onClick={handleClickOpen}> Add New Dish</AddDishBtn>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Dish</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a dish, please fill in the form and click submit button.
          </DialogContentText>
          <input
            accept="image/*"
            id="dish-img-file"
            multiple
            type="file"
          />

          <TextField
            autoFocus
            margin="dense"
            id="serve"
            label="How many people will this dish serve?"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Dish's name"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price($)"
            type="number"
            fullWidth
          />
            <TextField
            autoFocus
            margin="dense"
            multiline
            rowsMax="4"
            id="ingred"
            label="Ingredients"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            multiline
            rowsMax="4"
            id="required"
            label="Required Stuff"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
