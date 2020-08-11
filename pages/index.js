import { useContext } from 'react';

import Head from 'next/head';
import Layout from '../components/Layout';
import { Button } from 'reactstrap';
import '../components/CartContext';
import CartContext from '../components/CartContext';

export default function Home() {
  const context = useContext(CartContext);
  return (
    <>
      <Head>
        <title>Ecommerce</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </>
  );
}
