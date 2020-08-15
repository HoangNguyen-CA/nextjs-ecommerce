import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from '../components/Context/UserContext';
import { FirebaseContext } from '../components/Context/FirebaseContext';

import OrderItem from '../components/OrderItem';

const Orders = (props) => {
  let user = useContext(UserContext);

  let content = '';

  if (user) {
    content = user.orders.map((order, index) => {
      return <OrderItem key={index} order={order}></OrderItem>;
    });
  }
  return (
    <div>
      <h1>Orders</h1>
      {content}
    </div>
  );
};

export default Orders;
