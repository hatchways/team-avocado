import React, { useContext } from "react";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import AuthContext from "../store/createContext";
import { Link, withRouter } from "react-router-dom";


 function Menubutton(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user } = useContext(AuthContext);

  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }));

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleProfileClick(event) {
    props.history.push(`${user.usertype}/${user.id}`)
  }
  function handleClose() {
    setAnchorEl(null);
  }
  const classes = useStyles();
  return (
    <div>
      {/* TODO Get the currentuser and display name in menu */}
    <Button className={classes.button} onClick={handleClick} color="primary">{user.name}</Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default withRouter(Menubutton)