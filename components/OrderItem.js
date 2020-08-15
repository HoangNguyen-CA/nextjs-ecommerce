import React, { useEffect, useContext, useState } from 'react';

import { FirebaseContext } from '../components/Context/FirebaseContext';

const orderItem = (props) => {
  let firebase = useContext(FirebaseContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      let requests = [];

      for (let i in props.order) {
        requests.push(firebase.db.collection('products').doc(i).get());
      }

      let resArr = await Promise.all(requests);
      let prods = resArr.map((i) => ({
        data: i.data(),
        amount: props.order[i.id],
      }));
      setProducts(prods);
    }

    getProducts();
  }, []);

  let content = '';
  content = products.map((product) => {
    return <h1 key={product.data.name}>{product.data.name}</h1>;
  });

  return <div>{content}</div>;
};

export default orderItem;
