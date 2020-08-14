import React, { useEffect, useContext } from 'react';

const Product = (props) => {
  let fields = props.product.fields;
  let product = {
    name: fields.name.stringValue,
    brand: fields.brand.stringValue,
    price: fields.price.doubleValue,
    description: fields.description.stringValue,
  };
  return (
    <div>
      <h1>{product.name}</h1>
      <h1>{product.brand}</h1>
      <h1>{product.price}</h1>
      <h1>{product.description}</h1>
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

  return {
    props: {
      product,
    },
  };
}
