import React, { useContext, useEffect, useState } from 'react';
import router from 'next/router';
import Head from 'next/head';

import withErrorHandler from '../components/withErrorHandler';

import { UserContext } from '../components/Context/UserContext';
import { CartContext } from '../components/Context/CartContext';
import { OrdersContext } from '../components/Context/OrdersContext';

import { FirebaseContext } from '../components/Context/FirebaseContext';

import CartItem from '../components/CartItem';

import { Button, Alert, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import Spinner from '../components/Spinner';

const differentKeys = (a, b) => {
  let tempA = Object.keys(a);
  let tempB = Object.keys(b);

  if (JSON.stringify(tempA) === JSON.stringify(tempB)) return false;
  return true;
};

const Cart = (props) => {
  let firebase = useContext(FirebaseContext);
  let user = useContext(UserContext);

  const [prevCart, setPrevCart] = useState({});
  const [modal, setModal] = useState(false);

  const [cart, setCart] = useContext(CartContext);
  const [orders, setOrders] = useContext(OrdersContext);

  const [loadedCart, setLoadedCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const calculatePrice = () => {
    let total = 0;
    for (let item of loadedCart) {
      total += cart[item.id] * item.price;
    }
    return total.toFixed(2);
  };

  useEffect(() => {
    async function getProducts() {
      if (differentKeys(prevCart, cart)) {
        //checks if keys changed, then re-render products
        setPrevCart(cart);

        let requests = [];
        for (let i in cart) {
          requests.push(firebase.db.collection('products').doc(i).get());
        }

        setLoading(true);
        try {
          let cartItems = await Promise.all(requests);
          let data = cartItems.map((i) => ({
            ...i.data(),
            id: i.id,
            amount: cart[i.id],
          }));

          setLoading(false);
          setLoadedCart(data);
          console.log('CartItems Updated: ', data);
        } catch (e) {
          setLoading(false);
          this.props.setError(e);
        }
      }
    }

    getProducts();
  }, [cart]);

  const handleCheckout = async () => {
    if (Object.keys(cart).length <= 0) {
      return;
    }

    let updatedOrders = [...orders];
    updatedOrders.push({ cart: cart, price: calculatePrice() });

    if (user) {
      try {
        await firebase.db.collection('users').doc(user.uid).set(
          {
            orders: updatedOrders,
            cart: [],
          },
          { merge: true }
        );
      } catch (e) {
        this.props.setError(e);
      }
    } else {
      setModal(true);
    }
  };

  const handleEditCart = async (e, id, amount) => {
    e.preventDefault();
    let updatedCart = { ...cart };
    if (amount <= 0) {
      delete updatedCart[id];
    } else {
      updatedCart[id] = amount;
    }

    if (user) {
      try {
        let res = await firebase.db.collection('users').doc(user.uid).set(
          {
            cart: updatedCart,
          },
          { merge: true }
        );
      } catch (e) {
        props.setError(e);
      }
    } else {
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const goToSignup = () => {
    router.push('/signup');
  };

  const goToLogin = () => {
    router.push('/login');
  };

  let cartItems = [];

  for (let item of loadedCart) {
    cartItems.push(
      <CartItem
        key={item.id}
        item={{ ...item }}
        editCart={handleEditCart}
      ></CartItem>
    );
  }

  if (loadedCart.length <= 0) {
    cartItems = (
      <Alert color='danger' style={{ textAlign: 'center' }}>
        Your cart is empty
      </Alert>
    );
  } else {
  }

  return (
    <div>
      <Head>
        <title>Cart</title>
      </Head>
      <h1 className='mb-4' style={{ textAlign: 'center' }}>
        Cart
      </h1>
      <Modal isOpen={modal} toggle={toggleModal} centered={true} size='sm'>
        <ModalHeader toggle={toggleModal} style={{ textAlign: 'center' }}>
          You need to create an account to place an order
        </ModalHeader>
        <ModalFooter>
          <Button color='primary' onClick={goToSignup} block>
            Sign Up
          </Button>
          <Button onClick={goToLogin} block>
            Login
          </Button>
        </ModalFooter>
      </Modal>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {cartItems}
          {loadedCart.length > 0 ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button onClick={handleCheckout} className='mr-2'>
                  Checkout
                </Button>

                <h5 className='m-0'>Subtotal: ${calculatePrice()}</h5>
              </div>
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default withErrorHandler(Cart);
