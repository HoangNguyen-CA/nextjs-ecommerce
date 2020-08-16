import React, { useContext, useState, useEffect } from 'react';

import { Spinner, Input, Button, Label } from 'reactstrap';

import { FirebaseContext } from '../components/Context/FirebaseContext';
import { UserContext } from '../components/Context/UserContext';
import { CartContext } from '../components/Context/CartContext';

import styles from '../styles/cartItem.module.css';

const CartItem = (props) => {
  let firebase = useContext(FirebaseContext);
  let user = useContext(UserContext);
  let [cart, setCart] = useContext(CartContext);

  let [amount, setAmount] = useState(cart[props.item.id]);

  let handleAmountChanged = (e) => {
    setAmount(e.target.value);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    let updatedCart = { ...cart };
    updatedCart[props.item.id] = amount;
    firebase.db.collection('users').doc(user.uid).set(
      {
        cart: updatedCart,
      },
      { merge: true }
    );
  };

  let content = <Spinner></Spinner>;
  if (props.item) {
    content = (
      <>
        <div className={styles.contentContainer}>
          <div className={styles.contentItem}>
            <h5>{props.item.name}</h5>
            <p className={styles.info}>
              {props.item.brand}
              <br></br>Total Price: $
              {(props.item.price * cart[props.item.id]).toFixed(2)}
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.contentItem}>
            <div className={styles.inputContainer}>
              <Label className={styles.label}>Amount:</Label>
              <Input
                type='number'
                value={amount}
                onChange={handleAmountChanged}
              ></Input>
              <Button type='submit' block>
                Update
              </Button>
            </div>
          </form>
        </div>
      </>
    );
  }

  return <div className={styles.container}>{content}</div>;
};

export default CartItem;
