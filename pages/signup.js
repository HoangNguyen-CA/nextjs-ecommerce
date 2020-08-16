import React, { useState, useContext } from 'react';
import Head from 'next/head';
import router from 'next/router';

import { FirebaseContext } from '../components/Context/FirebaseContext';
import { CartContext } from '../components/Context/CartContext';

import InputGroup from '../components/Forms/InputGroup';
import { Form, Button, Spinner, Alert } from 'reactstrap';

import styles from '../styles/form.module.css';

const Signup = () => {
  let firebase = useContext(FirebaseContext);
  let [cart, setCart] = useContext(CartContext);

  const [controls, setControls] = useState({
    email: {
      type: 'input',
      config: {
        type: 'email',
      },
      value: '',
    },
    password: {
      type: 'input',
      config: {
        type: 'password',
      },
      value: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChanged = (event, controlName) => {
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: event.target.value,
      },
    };
    setControls(updatedControls);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    firebase.auth
      .createUserWithEmailAndPassword(
        controls.email.value,
        controls.password.value
      )
      .then((cred) => {
        firebase.db
          .collection('users')
          .doc(cred.user.uid)
          .set({
            cart: cart,
            orders: [],
          })
          .then(() => {
            setLoading(false);
            router.push('/');
          });
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <Head></Head>
      <div className='pb-2 mb-4 border-bottom'>
        <h1 className={[styles.header, 'mb-3'].join(' ')}>Sign Up</h1>
        {error ? <Alert color='danger'>{error}</Alert> : null}
      </div>
      <Form onSubmit={handleSubmit}>
        <InputGroup
          controls={controls}
          changed={handleInputChanged}
        ></InputGroup>
        <div className={styles.bottomrow}>
          {loading ? (
            <Spinner />
          ) : (
            <Button
              color='primary'
              size='lg'
              type='submit'
              className='mt-2'
              block
            >
              Sign Up
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default Signup;
