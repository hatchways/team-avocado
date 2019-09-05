import React, { useState } from "react";
import Context from "./createContext";

import useCachedState from "../hooks/useCachedState";

const mockOrderItems = [
  {
    name: "2 yakisoba dishes, 6 something else, 4 something else",
    price: 30,
    imageURL: "https://picsum.photos/200"
  },
  {
    name: "5 specialty sushi rolls",
    price: 23.5,
    imageURL: "https://picsum.photos/200"
  }
];
export default function Provider({ children }) {
  const [user, setUser] = useCachedState(null, "user");
  const [cart, setCart] = useState(mockOrderItems);
  const [order, setOrder] = useCachedState(null, "order");

  function addToCart(dish) {
    setCart([...cart, dish]);
  }

  function removeFromCart(dishToRemove) {
    const newCart = cart.filter(dish => dish.id != dishToRemove.id);
    setCart(newCart);
  }

  function getCurrentTotal() {
    return cart.reduce((accum, dish) => {
      accum += dish.price;
      return accum;
    }, 0);
  }

  function logout() {
    setUser(null);
    setCart(null);
    setOrder(null);
  }

  const initialState = {
    user,
    setUser,
    logout,
    cart,
    addToCart,
    removeFromCart,
    getCurrentTotal,
    order,
    setOrder
  };

  return <Context.Provider value={initialState}>{children}</Context.Provider>;
}
