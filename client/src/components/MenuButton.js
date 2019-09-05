import React, { useContext } from "react";
import styled from "styled-components";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import AuthContext from "../store/createContext";
import { Link, withRouter } from "react-router-dom";
import { colors } from "../themes/theme";

import { FiSettings } from "react-icons/fi";

const SettingsButtonContainer = styled.button`
  display: flex;
  align-items: center;

  border: none;
  background: none;
  cursor: pointer;

  font-size: 2rem;
  color: ${colors.brand};
`;

function Menubutton(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user, logout } = useContext(AuthContext);

  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1)
    },
    input: {
      display: "none"
    }
  }));

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleProfileClick(event) {
    props.history.push(`/${user.usertype}/${user.id}`);
  }
  function handleLogout() {
    logout();
    props.history.push(`/signup/customer`);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  function handleLogout() {
    props.history.push(`/login`)

  }
  const classes = useStyles();
  return (
    <div>
      <SettingsButtonContainer onClick={handleClick}>
        <FiSettings />
      </SettingsButtonContainer>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default withRouter(Menubutton);
