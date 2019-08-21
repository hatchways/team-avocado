import CuisineTag from "./CuisineTag"
import React from "react";



export default function Cuisinelist({ cuisineList }) {

    const cuisineComponents = cuisineList.map((name,i) =>{
        return <CuisineTag name={cuisineList[i]}/>;
    });
    return (
        <div>
            {cuisineComponents}

        </div>
    );
}
