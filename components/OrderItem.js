import React, { useEffect, useContext, useState } from 'react';

import { FirebaseContext } from '../components/Context/FirebaseContext';

const orderItem = (props) => {
  let firebase = useContext(FirebaseContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      let requests = [];
      for (let i in props.order) {
        requests.push(firebase.db.collection('products').doc(i));
      }
      let prods = [];

      for (let req of requests) {
        let temp = await req.get();
        let data = temp.data();
        prods.push(data);
      }
      setProducts(prods);
    }

    getProducts();
  }, []);

  let content = '';
  content = products.map((product) => {
    return <h1 key={product.name}>{product.name}</h1>;
  });

  return <div>{content}</div>;
};

export default orderItem;
