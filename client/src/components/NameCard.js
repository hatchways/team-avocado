import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


const Container = styled.div`


    height:100%;
    display : flex;
	flex-direction: column;
    justify-content:space-between;
    font-family: "Montserrat";
    #cover{
        max-width:100%;
    }

    #profile{
        display:block;
        margin-left:auto;
        margin-right:auto;
    }

    #name, #location, #desc, #email{
        text-align:center;
    }




`;

const RequestButton = styled(Button)`
  width:100%;
`;
const useStyles = makeStyles({
    form:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        height:"100%",
        justifyContent:"space-between",
    },
    input:{
        display:'none',

    },
    cover:{
        cursor:"pointer",
        maxWidth:"100%"
    },
    profile:{
        cursor:"pointer",
    },

    textField:{
        fontFamily: "Montserrat",
    }

});
//TODO: pass in props and get data from props
export default function Namecard({  }) {

    const classes = useStyles();

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
      };
    
    const [values, setValues] = React.useState({
        name: 'Atsushi Mikaki',
        location: 'Toronto, Canada',
        desc:'Chef with 8 years in Japanese cuisine. Reciepient of awards and positive feedback ',
        
    }); 
  
  
    return (

    <Container>
        <Switch>
          {/* change to if else, if user is logged in and  */}
          {/* this is user's profile page, show edit button */}
          
            <Route path="/chef/edit/:chef_id">  
            <form className={classes.form}>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="background-img-file"
                    multiple
                    type="file"
                />
                <label htmlFor="background-img-file">
                    <img className={classes.cover} alt="background" src="/cover-sushi.png" />

                </label>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="profile-img-file"
                    multiple
                    type="file"
                />
                <label htmlFor="background-img-file">
                    <img className ={classes.profile} alt="profile" src="/userpic-6.png" />

                </label>
                {/* <form className={classes.form}> */}
                <TextField
                    id="outlined-name"
                    label="Name"
                    className="{classes.textField}"
                    value={values.name}
                    onChange={handleChange('name')}
                    margin="dense"
                    variant="outlined"
                />
                <TextField
                    id="outlined-location"
                    label="Location"
                    className="{classes.textField}"
                    value={values.location}
                    onChange={handleChange('location')}
                    margin="dense"
                    variant="outlined"
                />
                <TextField
                    id="outlined-desc"
                    label="Description"
                    className="{classes.textField}"
                    multiline
                    rowsMax="4"
                    value={values.desc}
                    onChange={handleChange('desc')}
                    margin="dense"
                    variant="outlined"
                />
                <TextField
                    id="outlined-oldpassword"
                    label="Old Password"
                    className="{classes.textField}"
                    value={values.oldpassword}
                    onChange={handleChange('oldpassword')}
                    margin="dense"
                    variant="outlined"
                />

                <TextField
                    id="outlined-newpassword"
                    label="New Password"
                    className="{classes.textField}"
                    value={values.newpassword}
                    onChange={handleChange('newpassword')}
                    margin="dense"
                    variant="outlined"
                />
                <RequestButton type="submit" >
                    Save Profile
                </RequestButton>
                </form>
            </Route>
            <Route path="/chef/:chef_id">
                <img id="cover" alt="background" src="/cover-sushi.png" />
                <img id="profile" alt="profile" src="/userpic-6.png" />
                <p id="name"> Atsushi Mikaki </p>
                <p id="location"> Toronto Canada </p>
                <p id="desc">Chef with 8 years in Japanese cuisine. Reciepient of awards and positive feedback </p>
                <RequestButton type="submit" >
                    Send Request
                </RequestButton>
            </Route>
 
         
        </Switch>
    </Container>
  );
}
