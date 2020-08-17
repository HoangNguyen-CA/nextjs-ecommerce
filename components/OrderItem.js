import React from 'react';

import styles from '../styles/orderItem.module.css';

import OrderProductItem from '../components/OrderProductItem';

const orderItem = (props) => {
  let items = [];
  for (let i = 0; i < props.order.items.length; i++) {
    let item = props.order.items[i];
    items.push(<OrderProductItem key={i} item={item}></OrderProductItem>);
  }

  return (
    <div className={styles.contentContainer}>
      {items}
      <p className='mb-0'>Total Cost: ${props.order.price}</p>
    </div>
  );
};

export default orderItem;
