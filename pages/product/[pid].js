import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import { FirebaseContext } from '../../components/Context/FirebaseContext';

const Product = () => {
  let firebase = useContext(FirebaseContext);

  const router = useRouter();
  const { pid } = router.query;

  useEffect(() => {}, []);
  return <div></div>;
};

export default Product;
