import React from 'react';
import { removeCart } from '../Redux/Actions/CartAction';
import { connect } from 'react-redux';

class Cart extends React.Component {
  render() {
    const { cartItems, removeCart } = this.props;
    const baseUrl = 'https://localhost:44348/Images/';

    let totalCost = cartItems.reduce((sum, item) => sum + item.cost * item.Quantity, 0);
    let totalProducts = cartItems.reduce((sum, item) => sum + item.Quantity, 0);
    const cartList = cartItems.map((item, i) => {
      return (
        <tr key={i}>
          <td>{item.productName} </td>
          <td>{item.size}</td>
          <td>{item.Quantity}</td>
          <td>{item.cost}</td>
          <td>{parseInt(item.Quantity) * parseInt(item.cost)}</td>
          <td>
            <button
              className="btn btn-outline-info"
              style={{ padding: '2px 10px' }}
              onClick={() => removeCart(item, cartItems, false)}
            >
              x
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div className="div-Cart table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Product</th>
              <th>Size</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Tot.Cost</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>{cartList}</tbody>
        </table>
        Total {totalCost} INR
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.CartItems.items,
  };
};

const mapDispatchToProps = {
  removeCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
