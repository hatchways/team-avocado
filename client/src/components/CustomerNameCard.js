import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import GoogleMap from "./GoogleMap";

const RequestButton = styled(Button)`
  
  width:100%;
`;
const useStyles = makeStyles({
    namecard:{
        display:"flex",
        justifyContent:"space-between",
        flexDirection:"column",
        alignItems:"center",
    },
    profile:{
        display:"block",
        marginLeft:"auto",
        marginRight:"auto",
    },
    cardContainer:{
        display:"flex",
        justifyContent:"center",

        width:"100%",
        height:"87%",
        position:"absolute",
        bottom:0,
        background:"#f8f8fe",

        
    },
    upper:{
        display:"flex",
        height:"52%"
    },
    lower:{
        height:"48%"
    },
    leftpane:{

        width:"40%",
        height:"100%"
    },
    rightpane:{

        width:"60%",
        height:"100%"
    },
    card:{
        
        width:"70%",
        height:"95%",
        margin:20
    },
    wrap:{
        height:"100%",
        display:"flex",
        justifyContent:"space-around",
        flexDirection:"column",
        alignItems:"center",
        padding:40,
        borderRightColor: "#f8f8fe",
        borderRightStyle: "solid",
        borderRightWidth: "5px",
        borderBottomColor: "#f8f8fe",
        borderBottomStyle: "solid",
        borderBottomWidth: "5px",

    },



});
//TODO: pass in props and get data from props
export default function Namecard({}) {

    const classes = useStyles();

    const customer = {
        name: 'Christine Wilson',
        location: 'Toronto, Canada',
        aboutme:'Hi everyone! I am a foodie and I love to eat healthy and tasty meals. Also I am a mom of two beautiful babies.',
        favorite:"Japanese, Chinese, Mediterrane, Thai"
    }
    return (
    <div className={classes.cardContainer}>
        <Card className={classes.card}>
            <div className={classes.upper}>
                <div className={classes.leftpane}>
                    <div className={classes.wrap}>
                        <img className={classes.profile} alt="profile" src="/userpic-6.png" />
                        <p id="name"> {customer.name} </p>
                        <p id="location"> {customer.location} </p>
                        <RequestButton type="submit" >
                            Send Message
                        </RequestButton>
                    </div>
                </div>
                <div className={classes.rightpane}>
                    <div className={classes.wrap}>
                        <span>ABOUT ME:</span>
                        <p id="aboutme">{customer.aboutme}</p>
                        <span>FAVORITE CUSINE: </span>
                        <p id="favcuisines">{customer.favorite}</p>   
                    </div>
                </div>
            </div>
            <div className={classes.lower}>
                <GoogleMap>
                </GoogleMap>
            </div>

        </Card>
      </div>

  );
};
