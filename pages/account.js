import React, { useContext, useEffect } from 'react';
import Head from 'next/head';
import router from 'next/router';

import styles from '../styles/account.module.css';

import { UserContext } from '../components/Context/UserContext';

const Account = () => {
  const user = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user]);

  let content = null;
  if (user) {
    content = (
      <div className={styles.contentContainer}>
        <p className='lead'>Email: {user.email}</p>
        <p className='lead'>
          Email Verified: {user.emailVerified ? 'Yes' : 'No'}
        </p>
        <p className='lead'>
          Phone Number: {user.phoneNumber ? phoneNumber : 'Not Added'}
        </p>
      </div>
    );
  } else {
    content = null;
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Account</title>
      </Head>
      <h1 className='mb-4' style={{ textAlign: 'center' }}>
        Account
      </h1>
      {content}
    </div>
  );
};

export default Account;
