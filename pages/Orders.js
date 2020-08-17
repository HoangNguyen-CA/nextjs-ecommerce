import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';

import withErrorHandler from '../components/withErrorHandler';

import { UserContext } from '../components/Context/UserContext';
import { FirebaseContext } from '../components/Context/FirebaseContext';
import { OrdersContext } from '../components/Context/OrdersContext';

import { Alert } from 'reactstrap';
import Spinner from '../components/Spinner';

import OrderItem from '../components/OrderItem';

const OrdersPage = (props) => {
  let user = useContext(UserContext);
  let firebase = useContext(FirebaseContext);
  let [orders, setOrders] = useContext(OrdersContext);

  let [loadedOrders, setLoadedOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getOrders() {
      if (user) {
        let updatedOrders = [];
        for (let order of orders) {
          let requests = [];
          for (let id in order.cart) {
            requests.push(firebase.db.collection('products').doc(id).get());
          }

          setLoading(true);
          try {
            let res = await Promise.all(requests);

            let data = res.map((item) => ({
              id: item.id,
              ...item.data(),
              amount: order.cart[item.id],
            }));
            updatedOrders.push({ items: data, price: order.price });
          } catch (e) {
            setLoading(false);
            props.setError(e);
          }
        }
        setLoading(false);
        setLoadedOrders(updatedOrders);
        console.log('OrderItems Updated: ', updatedOrders);
      }
    }

    getOrders();
  }, [orders]);

  let orderItems = '';

  if (loadedOrders.length <= 0) {
    orderItems = (
      <Alert color='danger' style={{ textAlign: 'center' }}>
        You have no orders
      </Alert>
    );
  } else {
    orderItems = loadedOrders.map((order, index) => (
      <OrderItem order={order} key={index}></OrderItem>
    ));
  }

  return (
    <div>
      <Head>
        <title>orders</title>
      </Head>
      <h1 className='mb-4' style={{ textAlign: 'center' }}>
        Orders
      </h1>
      {loading ? <Spinner /> : orderItems}
    </div>
  );
};

export default withErrorHandler(OrdersPage);
