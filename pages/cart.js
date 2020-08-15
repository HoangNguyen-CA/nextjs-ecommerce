import React, { useContext } from 'react';
import { UserContext } from '../components/Context/UserContext';

import CartItem from '../components/CartItem';

const cart = (props) => {
  let user = useContext(UserContext);

  let cartItems = [];
  if (!user) {
  } else {
    let cart = user.cart;
    for (let i in cart) {
      cartItems.push(<CartItem key={i} id={i} amount={cart[i]}></CartItem>);
    }
  }
  return <div>{cartItems}</div>;
};

export default cart;
