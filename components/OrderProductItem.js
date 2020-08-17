import React from 'react';

const OrderProductItem = (props) => {
  return (
    <div>
      <h5>{props.item.name}</h5>
      <p>
        Price: ${props.item.price}
        <br></br>
        Amount: {props.item.amount}
      </p>
      <hr></hr>
    </div>
  );
};

export default OrderProductItem;
