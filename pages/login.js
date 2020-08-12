import React, { useState } from 'react';
import Head from 'next/head';

import InputGroup from '../components/Forms/InputGroup';
import { Form, Button, Container } from 'reactstrap';

const Login = () => {
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
        <h1>Login</h1>
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

export default Login;
