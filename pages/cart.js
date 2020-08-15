import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../components/Context/UserContext';
import { FirebaseContext } from '../components/Context/FirebaseContext';

import CartItem from '../components/CartItem';

import { Button } from 'reactstrap';

const cart = (props) => {
  let firebase = useContext(FirebaseContext);
  let user = useContext(UserContext);

  const [userCart, setUserCart] = useState([]);
  const [cart, setCart] = useState([]);

  const compareKeys = (a, b) => {
    let aKeys = Object.keys(a).sort();
    let bKeys = Object.keys(b).sort();
    return JSON.stringify(aKeys) === JSON.stringify(bKeys);
  };

  const calculatePrice = () => {
    let total = 0;
    for (let item of cart) {
      total += user.cart[item.id] * item.price;
    }
    return total.toFixed(2);
  };

  useEffect(() => {
    async function getProducts() {
      if (user) {
        //only update items if cart changes
        if (!compareKeys(userCart, user.cart)) {
          setUserCart(user.cart);

          let requests = [];
          for (let i in user.cart) {
            requests.push(firebase.db.collection('products').doc(i).get());
          }

          let cartItems = await Promise.all(requests);
          let data = cartItems.map((i) => ({ ...i.data(), id: i.id }));
          setCart(data);
          console.log('CartItems Updated: ', data);
        }
      }
    }
    getProducts();
  }, [user]);

  let cartItems = [];

  for (let item of cart) {
    cartItems.push(<CartItem key={item.id} item={item}></CartItem>);
  }

  const handleCheckout = () => {
    let updatedOrders = user.orders;
    updatedOrders.push({ cart: user.cart, price: calculatePrice() });
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
