import React from 'react';
import Navbar from './Navbar';
import styles from '../styles/layout.module.css';

const Layout = (props) => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <main> {props.children}</main>
      </div>
    </>
  );
};

export default Layout;
