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
import TransferList from "./TransferList";

const useStyles = makeStyles({


});

export default function PickdishDialog(props ) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const PickTagBtn = styled(Button)`
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
        <PickTagBtn onClick={handleClickOpen}> Pick new tag</PickTagBtn>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Select tags</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To select tags, please check tags and click &lt; or &gt; to move tags.
          </DialogContentText>
            <TransferList cuisines={props.cuisines}/>
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
