import React, { useContext, useEffect, useState } from 'react';

import withErrorHandler from '../components/withErrorHandler';

import { UserContext } from '../components/Context/UserContext';
import { FirebaseContext } from '../components/Context/FirebaseContext';
import { OrdersContext } from '../components/Context/OrdersContext';

import { Alert } from 'reactstrap';

import OrderItem from '../components/OrderItem';

const Orders = (props) => {
  let user = useContext(UserContext);
  let firebase = useContext(FirebaseContext);
  let [orders, setOrders] = useContext(OrdersContext);

  let [loadedOrders, setLoadedOrders] = useState([]);

  useEffect(() => {
    async function getOrders() {
      if (user) {
        let updatedOrders = [];
        for (let order of orders) {
          let requests = [];
          for (let id in order.cart) {
            requests.push(firebase.db.collection('products').doc(id).get());
          }
          try {
            let res = await Promise.all(requests);

            let data = res.map((item) => ({
              id: item.id,
              ...item.data(),
              amount: order.cart[item.id],
            }));
            updatedOrders.push({ items: data, price: order.price });
          } catch (e) {
            props.setError(e);
          }
        }
        setLoadedOrders(updatedOrders);
        console.log('OrderItems Updated: ', updatedOrders);
      }
    }

    getOrders();
  }, [orders]);

  let content = '';

  if (loadedOrders.length <= 0) {
    content = (
      <Alert color='danger' style={{ textAlign: 'center' }}>
        You have no orders
      </Alert>
    );
  } else {
    content = loadedOrders.map((order, index) => (
      <OrderItem order={order} key={index}></OrderItem>
    ));
  }

  return (
    <div>
      <h1 className='mb-4' style={{ textAlign: 'center' }}>
        Orders
      </h1>
      {content}
    </div>
  );
};

export default withErrorHandler(Orders);
