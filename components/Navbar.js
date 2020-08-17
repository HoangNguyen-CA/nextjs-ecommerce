import React, { useState, useContext } from 'react';
import Link from 'next/link';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { FirebaseContext } from './Context/FirebaseContext';
import { UserContext } from './Context/UserContext';

import styles from '../styles/util.module.css';

const AppBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);

  const handleLogout = () => {
    firebase.auth.signOut().then(() => {});
  };

  return (
    <div>
      <Navbar color='light' light expand='md'>
        <NavbarBrand>Graphics Card Emporium</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <Link href='/'>
                <NavLink className={styles.pointer}>Home</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href='/cart'>
                <NavLink className={styles.pointer}>Cart</NavLink>
              </Link>
            </NavItem>
            {!user ? (
              <>
                <NavItem>
                  <Link href='/login'>
                    <NavLink className={styles.pointer}>Login</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href='/signup'>
                    <NavLink className={styles.pointer}>Sign Up</NavLink>
                  </Link>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <Link href='/orders'>
                    <NavLink className={styles.pointer}>Orders</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href='/account'>
                    <NavLink className={styles.pointer}>Account</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <NavLink className={styles.pointer} onClick={handleLogout}>
                    Sign out
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default AppBar;
