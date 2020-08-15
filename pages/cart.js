import React, { useContext } from 'react';
import { UserContext } from '../components/Context/UserContext';
import { FirebaseContext } from '../components/Context/FirebaseContext';

import CartItem from '../components/CartItem';

import { Button } from 'reactstrap';

const cart = (props) => {
  let firebase = useContext(FirebaseContext);
  let user = useContext(UserContext);

  let cartItems = [];
  if (!user) {
  } else {
    console.log(user.cart, ' wow');

    let cart = user.cart;
    for (let i in cart) {
      cartItems.push(<CartItem key={i} id={i} amount={cart[i]}></CartItem>);
    }
  }

  const handleCheckout = () => {
    let updatedOrders = user.orders;
    updatedOrders.push(user.cart);
    console.log(updatedOrders);

    firebase.db.collection('users').doc(user.uid).set(
      {
        orders: updatedOrders,
      },
      { merge: true }
    );
  };
  return (
    <div>
      {cartItems}
      <Button onClick={handleCheckout}>Checkout</Button>
    </div>
  );
};

export default cart;
