import { useContext, useEffect } from 'react';
import Head from 'next/head';

import { CartContext } from '../components/Context/CartContext';
import { FirebaseContext } from '../components/Context/FirebaseContext';

export default function Home() {
  const cart = useContext(CartContext);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    firebase.db
      .collection('products')
      .get()
      .then((snapshot) => {
        console.log(snapshot.docs);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Ecommerce</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </>
  );
}
