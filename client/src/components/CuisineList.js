import CuisineTag from "./CuisineTag"
import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

    wrap:{

        display:"flex",
        flexWrap:"wrap",
    }
});

export default function Cuisinelist({ cuisineList }) {
    const classes = useStyles();

    const cuisineComponents = cuisineList.map((name,i) =>{
        return <CuisineTag name={cuisineList[i]}/>;
    });
    return (
        <div className={classes.wrap}>
            {cuisineComponents}

        </div>
    );
}
