import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from '../components/Context/UserContext';
import { FirebaseContext } from '../components/Context/FirebaseContext';
import { OrdersContext } from '../components/Context/OrdersContext';

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
          let res = await Promise.all(requests);

          let data = res.map((item) => ({
            id: item.id,
            ...item.data(),
            amount: order.cart[item.id],
          }));
          updatedOrders.push({ items: data, price: order.price });
        }
        setLoadedOrders(updatedOrders);
        console.log('OrderItems Updated: ', updatedOrders);
      }
    }

    getOrders();
  }, [orders]);

  let content = '';

  content = loadedOrders.map((order, index) => (
    <OrderItem order={order} key={index}></OrderItem>
  ));

  return <div>{content}</div>;
};

export default Orders;
