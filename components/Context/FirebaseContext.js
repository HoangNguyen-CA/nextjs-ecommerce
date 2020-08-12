import React, { createContext, useEffect } from 'react';
import Firebase from '../../firebase/config';

export const FirebaseContext = createContext();

export const FirebaseProvider = (props) => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContext;
