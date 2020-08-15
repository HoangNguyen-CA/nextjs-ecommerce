import React, { createContext, useEffect, useContext, useState } from 'react';
import { FirebaseContext } from './FirebaseContext';

export const UserContext = createContext();

export const UserProvider = (props) => {
  let firebase = useContext(FirebaseContext);

  let [user, setUser] = useState(null);

  useEffect(function () {
    let dbListener = null;

    firebase.auth.onAuthStateChanged(async (resUser) => {
      if (dbListener !== null) {
        dbListener();
      }
      if (resUser) {
        let doc = firebase.db.collection('users').doc(resUser.uid);
        let res = await doc.get();

        let data = res.data();
        let cart = data.cart;
        let orders = data.orders;

        resUser.cart = cart;
        resUser.orders = orders;
        setUser(resUser);

        dbListener = doc.onSnapshot((snapshot) => {
          let data = snapshot.data();
          let updatedUser = { ...resUser };
          updatedUser.cart = data.cart;
          updatedUser.orders = data.orders;
          setUser(updatedUser);
        });
      } else {
        setUser(resUser);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};

export default FirebaseContext;
