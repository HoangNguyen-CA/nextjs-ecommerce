import React, { createContext, useEffect, useContext, useState } from 'react';

import { FirebaseContext } from './FirebaseContext';
import { CartContext } from './CartContext';
import { OrdersContext } from './OrdersContext';

export const UserContext = createContext();

export const UserProvider = (props) => {
  let firebase = useContext(FirebaseContext);
  let [cart, setCart] = useContext(CartContext);
  let [orders, setOrders] = useContext(OrdersContext);

  let [user, setUser] = useState(null);

  useEffect(function () {
    let dbListener = null;

    firebase.auth.onAuthStateChanged(async (resUser) => {
      if (dbListener !== null) {
        dbListener();
      }
      if (resUser) {
        let doc = firebase.db.collection('users').doc(resUser.uid);
        setUser(resUser);

        dbListener = doc.onSnapshot((snapshot) => {
          console.log('DB CHANGE');

          let data = snapshot.data();

          if (JSON.stringify(cart) !== JSON.stringify(data.cart)) {
            setCart(data.cart);
          }
          if (JSON.stringify(orders) !== JSON.stringify(data.orders)) {
            setOrders(data.orders);
          }
        });
      } else {
        setUser(null);
        if (localStorage.getItem('cart')) {
          setCart(JSON.parse(localStorage.getItem('cart')));
        }
      }
    });
  }, []);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};

export default FirebaseContext;
