import { makeStyles } from '@material-ui/core/styles';
import { colors } from "../themes/theme";
import CuisineTag from "./CuisineTag"
import React from "react";

const useStyles = makeStyles({
    name:{
        backgroundColor:colors.brandLight,
        color:"white",
    }
});

export default function Cuisinelist({ cuisineList }) {

    const classes = useStyles();
    const cuisinecomponent = cuisineList.map((name,i) =>{
        return <CuisineTag name={cuisineList[i]}/>;
    });
    return (
        <div>
            {cuisinecomponent}

        </div>
    );
}
