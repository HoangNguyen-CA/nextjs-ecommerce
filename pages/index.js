import { useContext } from 'react';
import Head from 'next/head';
import axios from 'axios';

import Product from '../components/Product';
import { Container, Row, Col } from 'reactstrap';

import { FirebaseContext } from '../components/Context/FirebaseContext';

export default function Home(props) {
  let productContent = null;
  if (props.products) {
    productContent = props.products.map((product) => {
      let fields = product.fields;
      console.log(fields);
      return (
        <Col xs='12' sm='6' md='4' lg='3' className='my-3' key={product.name}>
          <Product
            name={fields.name.stringValue}
            price={fields.price.doubleValue}
            description={fields.description.stringValue}
            brand={fields.brand.stringValue}
          ></Product>
        </Col>
      );
    });
  }

  return (
    <>
      <Head>
        <title>Ecommerce</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container>
        <Row>{productContent}</Row>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  let res = await fetch(
    'https://firestore.googleapis.com/v1/projects/nextjs-ecommerce-3da46/databases/(default)/documents/products'
  );

  let products = await res.json();
  return {
    props: {
      products: products.documents,
    },
  };
}
