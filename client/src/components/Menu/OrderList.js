import Order from "../Order"
import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

    wrap:{
        width:"100%",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
    }
});

export default function Orderlist({ orderList }) {
    console.log(orderList);
    const classes = useStyles();

    const ordersComponents = orderList.map((order,i) =>{
        return <Order order={order} key={i}/>;
    });
    return (
        <div className={classes.wrap}>
            {ordersComponents}

        </div>
    );
}
