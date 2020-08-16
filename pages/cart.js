import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from '../components/Context/UserContext';
import { CartContext } from '../components/Context/CartContext';
import { OrdersContext } from '../components/Context/OrdersContext';

import { FirebaseContext } from '../components/Context/FirebaseContext';

import CartItem from '../components/CartItem';

import { Button, Alert } from 'reactstrap';

const cart = (props) => {
  let firebase = useContext(FirebaseContext);
  let user = useContext(UserContext);

  const [prevCart, setPrevCart] = useState({});
  const [cart, setCart] = useContext(CartContext);
  const [orders, setOrders] = useContext(OrdersContext);

  const [loadedCart, setLoadedCart] = useState([]);

  const calculatePrice = () => {
    let total = 0;
    for (let item of loadedCart) {
      total += cart[item.id] * item.price;
    }
    return total.toFixed(2);
  };

  const differentKeys = (a, b) => {
    let tempA = Object.keys(a);
    let tempB = Object.keys(b);

    if (JSON.stringify(tempA) === JSON.stringify(tempB)) return false;
    return true;
  };

  useEffect(() => {
    async function getProducts() {
      if (differentKeys(prevCart, cart)) {
        //checks if keys changed, then re-render products
        setPrevCart(cart);

        let requests = [];
        for (let i in cart) {
          requests.push(firebase.db.collection('products').doc(i).get());
        }

        let cartItems = await Promise.all(requests);
        let data = cartItems.map((i) => ({ ...i.data(), id: i.id }));
        setLoadedCart(data);
        console.log('CartItems Updated: ', data);
      }
    }

    getProducts();
  }, [cart]);

  let cartItems = [];

  for (let item of loadedCart) {
    cartItems.push(<CartItem key={item.id} item={item}></CartItem>);
  }

  const handleCheckout = async () => {
    if (Object.keys(cart).length <= 0) {
      return;
    }

    let updatedOrders = [...orders];
    updatedOrders.push({ cart: cart, price: calculatePrice() });

    await firebase.db.collection('users').doc(user.uid).set(
      {
        orders: updatedOrders,
        cart: [],
      },
      { merge: true }
    );
  };

  if (Object.keys(cart).length <= 0) {
    cartItems = (
      <Alert color='danger' style={{ textAlign: 'center' }}>
        Your cart is empty
      </Alert>
    );
  } else {
    cartItems.push(
      <Button onClick={handleCheckout} key='SUBMITBUTTON'>
        Checkout
      </Button>
    );
  }

  return <div>{cartItems}</div>;
};

export default cart;
