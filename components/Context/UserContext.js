import React, { createContext, useEffect, useContext, useState } from 'react';
import { FirebaseContext } from './FirebaseContext';

export const UserContext = createContext();

export const UserProvider = (props) => {
  let firebase = useContext(FirebaseContext);

  let [user, setUser] = useState(null);

  useEffect(function () {
    firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        firebase.db
          .collection('users')
          .doc(user.uid)
          .get()
          .then((res) => {
            let data = res.data();
            let cart = data.cart;
            let orders = data.orders;
            user.cart = cart;
            user.orders = orders;
            setUser(user);
          });
      } else {
        setUser(user);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};

export default FirebaseContext;
