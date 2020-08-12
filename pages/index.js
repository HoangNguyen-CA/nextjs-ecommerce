import { useContext, useEffect } from 'react';
import Head from 'next/head';

import Product from '../components/Product';
import { Container, Row, Col } from 'reactstrap';

import { FirebaseContext } from '../components/Context/FirebaseContext';

export default function Home() {
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
      <Container>
        <Row>
          <Col xs='12' sm='6' md='4' lg='3' className='my-3'>
            <Product></Product>
          </Col>
          <Col xs='12' sm='6' md='4' lg='3' className='my-3'>
            <Product></Product>
          </Col>
          <Col xs='12' sm='6' md='4' lg='3' className='my-3'>
            <Product></Product>
          </Col>
          <Col xs='12' sm='6' md='4' lg='3' className='my-3'>
            <Product></Product>
          </Col>
          <Col xs='12' sm='6' md='4' lg='3' className='my-3'>
            <Product></Product>
          </Col>
        </Row>
      </Container>
    </>
  );
}
