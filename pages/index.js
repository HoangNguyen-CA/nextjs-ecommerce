import Head from 'next/head';

import Product from '../components/Product';
import { Container, Row, Col } from 'reactstrap';

export default function Home(props) {
  let productContent = null;
  if (props.products) {
    productContent = props.products.map((product) => {
      let tempArr = product.name.split('/');
      let id = tempArr[tempArr.length - 1];
      let fields = product.fields;
      return (
        <Col xs='12' sm='6' md='4' lg='3' className='my-3' key={id}>
          <Product
            id={id}
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
