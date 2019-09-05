import React from "react";
import useResource from "../hooks/useResource";

const OrderItem = ({ dish: dishId, price, numDishes }) => {
    const { resource, loading, error } = useResource(`dish/${dishId}`);
  
    return (
      <li className="order-item">
        {loading ? (
          "Loading..."
        ) : (
          <>
            <img src={resource.dishImg} alt="dish" />
            <div>
              <h1>{resource.name}</h1>
              <p>
                <span>${price}</span>
                <span>x{numDishes}</span>
              </p>
            </div>
          </>
        )}
      </li>
    );
};
export default OrderItem;