import React, { useContext, useEffect, useState } from 'react';

import withErrorHandler from '../components/withErrorHandler';

import { UserContext } from '../components/Context/UserContext';
import { CartContext } from '../components/Context/CartContext';
import { OrdersContext } from '../components/Context/OrdersContext';

import { FirebaseContext } from '../components/Context/FirebaseContext';

import CartItem from '../components/CartItem';

import { Button, Alert } from 'reactstrap';

const Cart = (props) => {
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

        try {
          let cartItems = await Promise.all(requests);
          let data = cartItems.map((i) => ({
            ...i.data(),
            id: i.id,
            amount: cart[i.id],
          }));
          setLoadedCart(data);
          console.log('CartItems Updated: ', data);
        } catch (e) {
          this.props.setError(e);
        }
      }
    }

    getProducts();
  }, [cart]);

  const handleCheckout = async () => {
    if (Object.keys(cart).length <= 0) {
      return;
    }

    let updatedOrders = [...orders];
    updatedOrders.push({ cart: cart, price: calculatePrice() });

    try {
      await firebase.db.collection('users').doc(user.uid).set(
        {
          orders: updatedOrders,
          cart: [],
        },
        { merge: true }
      );
    } catch (e) {
      this.props.setError(e);
    }
  };

  const handleEditCart = async (e, id, amount) => {
    e.preventDefault();
    let updatedCart = { ...cart };
    updatedCart[id] = amount;

    if (user) {
      try {
        let res = await firebase.db.collection('users').doc(user.uid).set(
          {
            cart: updatedCart,
          },
          { merge: true }
        );
      } catch (e) {
        props.setError(e);
      }
    } else {
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  let cartItems = [];

  for (let item of loadedCart) {
    cartItems.push(
      <CartItem
        key={item.id}
        item={{ ...item }}
        editCart={handleEditCart}
      ></CartItem>
    );
  }

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

export default withErrorHandler(Cart);
