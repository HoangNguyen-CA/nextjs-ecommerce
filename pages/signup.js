import React, { useState, useContext } from 'react';
import Head from 'next/head';
import { FirebaseContext } from '../components/Context/FirebaseContext';

import InputGroup from '../components/Forms/InputGroup';
import { Form, Button } from 'reactstrap';

const Signup = () => {
  let firebase = useContext(FirebaseContext);
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
  };

  return (
    <div>
      <Head></Head>
      <div className='pb-2 mb-4 border-bottom'>
        <h1>Sign Up</h1>
      </div>
      <Form onSubmit={handleSubmit}>
        <InputGroup
          controls={controls}
          changed={handleInputChanged}
        ></InputGroup>
        <Button type='submit'>Login</Button>
      </Form>
    </div>
  );
};

export default Signup;
