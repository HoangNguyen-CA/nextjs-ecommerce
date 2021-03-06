import React, { useContext, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Head from 'next/head';

import withErrorHandler from '../../components/withErrorHandler';

import styles from '../../styles/product.module.css';

import { FirebaseContext } from '../../components/Context/FirebaseContext';
import { UserContext } from '../../components/Context/UserContext';
import { CartContext } from '../../components/Context/CartContext';
import { Button } from 'reactstrap';

const Product = (props) => {
  const firebase = useContext(FirebaseContext);
  let user = useContext(UserContext);
  let [cart, setCart] = useContext(CartContext);
  let [amountInCart, setAmountInCart] = useState(0);

  useEffect(() => {
    if (cart) {
      if (cart[props.product.id]) {
        setAmountInCart(cart[props.product.id]);
      }
    }
  }, [cart]);

  const handleAddToCart = async () => {
    let updatedCart = { ...cart };
    let field = updatedCart[props.product.id];
    if (field) {
      updatedCart[props.product.id] = +field + 1;
    } else {
      updatedCart[props.product.id] = +1;
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

  return (
    <div className={styles.container}>
      <Head>
        <title>{props.product.name}</title>
      </Head>

      <div className={styles.imageContainer}>
        <img src={props.product.image} className={styles.image}></img>
      </div>
      <div className={styles.content}>
        <h3>{props.product.name}</h3>
        <h5>Brand: {props.product.brand}</h5>

        <ReactMarkdown
          source={props.product.description}
          escapeHtml={false}
        ></ReactMarkdown>
        <p className='lead'>
          <em>${props.product.price}</em>
        </p>
        <p className='lead'>{amountInCart} already in cart</p>
        <Button onClick={handleAddToCart}>Add To Cart</Button>
      </div>
    </div>
  );
};

export default withErrorHandler(Product);

export async function getStaticPaths() {
  let res = await fetch(
    'https://firestore.googleapis.com/v1/projects/nextjs-ecommerce-3da46/databases/(default)/documents/products'
  );

  let products = await res.json();

  let paths = products.documents.map((product) => {
    let tempArr = product.name.split('/');
    let id = tempArr[tempArr.length - 1];
    return { params: { pid: id } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let res = await fetch(
    `https://firestore.googleapis.com/v1/projects/nextjs-ecommerce-3da46/databases/(default)/documents/products/${params.pid}`
  );

  let product = await res.json();

  let tempArr = product.name.split('/');
  let id = tempArr[tempArr.length - 1];

  let fields = product.fields;
  let updatedProduct = {
    id: id,
    image: fields.image.stringValue,
    name: fields.name.stringValue,
    brand: fields.brand.stringValue,
    price: fields.price.doubleValue,
    description: fields.description.stringValue,
  };
  return {
    props: {
      product: updatedProduct,
    },
  };
}
