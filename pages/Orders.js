import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from '../components/Context/UserContext';
import { FirebaseContext } from '../components/Context/FirebaseContext';

import OrderItem from '../components/OrderItem';

const Orders = (props) => {
  let user = useContext(UserContext);
  let firebase = useContext(FirebaseContext);

  let [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getOrders() {
      if (user) {
        let updatedOrders = [];
        for (let order of user.orders) {
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
        setOrders(updatedOrders);
        console.log('OrderItems Updated: ', updatedOrders);
      }
    }

    getOrders();
  }, [user]);

  let content = '';

  content = orders.map((order, index) => (
    <OrderItem order={order} key={index}></OrderItem>
  ));

  return <div>{content}</div>;
};

export default Orders;
