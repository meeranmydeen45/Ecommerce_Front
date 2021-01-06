import React from 'react';
import Product from './Product';
import Cart from './Cart';

export default function OrderComponent() {
  return (
    <div className="orderContainer">
      <div className="o-container1">
        <Product />
      </div>
      <div className="o-container2">
        <Cart />
      </div>
    </div>
  );
}
