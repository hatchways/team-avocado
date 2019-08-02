import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DishCard from './DishCard';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';


const useStyles = makeStyles({



  menu:{
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    background:"#f8f8fe",
    height:"100%",
    width:"100%",

  },

  scroll:{
    width:"80%",
    height:"83%",
    overflowY:"scroll",
    position:"absolute",
    bottom:"0px",
  },

  titlediv:{
    height:"17%",
  },

  title:{
    lineHeight: "60px",
    height:"60px",
  },

});

export default function Chefsmenu() {
  const classes = useStyles();
  return (
    <Grid className={classes.menu}>
        <div className={classes.titlediv}>
            <span className={classes.title}>Atsushi's Menu:</span>

        </div>
        <div className={classes.scroll}>
            <DishCard/>
            <DishCard/>
        </div>
    </Grid>
  );
}



