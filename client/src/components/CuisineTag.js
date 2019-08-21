import { makeStyles } from '@material-ui/core/styles';
import { colors } from "../themes/theme";
import React from "react";

const useStyles = makeStyles({

    name:{
        backgroundColor:colors.brandLight,
        color:"white",
        margin:5
    }
});

export default function Cuisinetag({ name }) {

    const classes = useStyles();

    return (
        <span className={classes.name}>{name} </span>

  
    );
}
