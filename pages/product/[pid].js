import React, { useContext } from 'react';

import styles from '../../styles/product.module.css';

import { FirebaseContext } from '../../components/Context/FirebaseContext';
import { UserContext } from '../../components/Context/UserContext';
import { Button } from 'reactstrap';

const Product = (props) => {
  const firebase = useContext(FirebaseContext);
  let user = useContext(UserContext);

  const handleAddToCart = () => {
    let cart = user.cart;
    let field = cart[props.product.id];
    if (field) {
      cart[props.product.id] = field + 1;
    } else {
      cart[props.product.id] = 1;
    }

    firebase.db
      .collection('users')
      .doc(user.uid)
      .set(
        {
          cart,
        },
        { merge: true }
      )
      .then(() => {
        user.cart = cart;
        console.log(user.cart);
      });
  };

  return (
    <div>
      <h1>{props.product.id}</h1>

      <h1>{props.product.name}</h1>
      <h1>{props.product.brand}</h1>
      <h1>{props.product.price}</h1>
      <h1>{props.product.description}</h1>
      <Button onClick={handleAddToCart}>Add To Cart</Button>
    </div>
  );
};

export default Product;

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
