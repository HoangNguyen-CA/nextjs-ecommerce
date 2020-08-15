import React, { useContext, useState, useEffect } from 'react';

import { Spinner, Input, Button } from 'reactstrap';

import { FirebaseContext } from '../components/Context/FirebaseContext';
import { UserContext } from '../components/Context/UserContext';

import styles from '../styles/cartItem.module.css';

const CartItem = (props) => {
  let firebase = useContext(FirebaseContext);
  let user = useContext(UserContext);

  let [product, setProduct] = useState(null);
  let [amount, setAmount] = useState(props.amount);

  useEffect(() => {
    firebase.db
      .collection('products')
      .doc(props.id)
      .get()
      .then((res) => {
        setProduct(res.data());
      });
  }, []);

  let handleAmountChanged = (e) => {
    setAmount(e.target.value);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    let updatedCart = user.cart;
    updatedCart[props.id] = amount;
    firebase.db.collection('users').doc(user.uid).set(
      {
        cart: updatedCart,
      },
      { merge: true }
    );
  };

  let content = <Spinner></Spinner>;
  if (product) {
    content = (
      <>
        <p>{product.name}</p>
        <p>{product.brand}</p>
        <p>{product.price}</p>
        <form onSubmit={handleSubmit}>
          <Input
            type='number'
            value={amount}
            onChange={handleAmountChanged}
          ></Input>
          <Button type='submit'>Update</Button>
        </form>
      </>
    );
  }

  return <div className={styles.container}>{content}</div>;
};

export default CartItem;
