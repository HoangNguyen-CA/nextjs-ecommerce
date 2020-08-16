import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = (props) => {
  let [cart, setCart] = useState({});
  console.log('Cart Updated: ', cart);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
