import React, { useState, useContext } from 'react';
import Head from 'next/head';
import { FirebaseContext } from '../components/Context/FirebaseContext';

import InputGroup from '../components/Forms/InputGroup';
import { Form, Button, Container, Spinner } from 'reactstrap';

import styles from '../styles/form.module.css';

const Login = () => {
  const firebase = useContext(FirebaseContext);
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
    setLoading(true);
    firebase.auth
      .signInWithEmailAndPassword(controls.email.value, controls.password.value)
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <Head></Head>
      <div className='pb-2 mb-4 border-bottom'>
        <h1 className={styles.header}>Login</h1>
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
              Login
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default Login;
