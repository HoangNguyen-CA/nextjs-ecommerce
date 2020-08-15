import React from 'react';

const OrderProductItem = (props) => {
  return (
    <div>
      <h5>{props.item.name}</h5>
      <p>
        ${props.item.price}
        <br></br>
        {props.item.amount}
      </p>
    </div>
  );
};

export default OrderProductItem;
