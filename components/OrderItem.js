import React from 'react';

import OrderProductItem from '../components/OrderProductItem';

const orderItem = (props) => {
  let items = [];
  for (let i = 0; i < props.order.items.length; i++) {
    let item = props.order.items[i];
    items.push(<OrderProductItem key={i} item={item}></OrderProductItem>);
  }

  return (
    <div>
      {items}
      <p>Total Cost: ${props.order.price}</p>
      <hr></hr>
    </div>
  );
};

export default orderItem;
