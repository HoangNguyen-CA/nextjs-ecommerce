import React, { createContext, useEffect, useContext, useState } from 'react';
import { FirebaseContext } from './FirebaseContext';

export const UserContext = createContext();

export const UserProvider = (props) => {
  let firebase = useContext(FirebaseContext);

  let [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('user logged in:', user);
      } else {
        console.log('user logged out');
      }
      setUser(user);
    });
  }, []);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};

export default FirebaseContext;
