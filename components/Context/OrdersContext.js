import React, { createContext, useState } from 'react';

export const OrdersContext = createContext();

export const OrdersProvider = (props) => {
  let [orders, setOrders] = useState([]);

  return (
    <OrdersContext.Provider value={[orders, setOrders]}>
      {props.children}
    </OrdersContext.Provider>
  );
};

export default OrdersContext;
