import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import useTextBoxControl from '../shared/utils/useTexBoxControl';
import { removeCart, cartItemIncrement, cartItemDecrement } from '../Redux/Actions/CartAction';
import { customerRegistration } from '../shared/utils/apicalls';

function CartList({ cartItems, removeCart, cartItemIncrement, cartItemDecrement }) {
  const baseUrl = 'https://localhost:44348/Images/';

  let totalCost = cartItems.reduce((sum, item) => sum + item.cost * item.Quantity, 0);
  let totalProducts = cartItems.reduce((sum, item) => sum + item.Quantity, 0);

  const mobileNumber = useTextBoxControl('');
  const custName = useTextBoxControl('');
  const custAddress = useTextBoxControl('');

  const handleClick = (cartItems) => {
    axios.post(`https://localhost:44348/api/home/pruchase`, cartItems).then((res) => {
      alert('Transaction Completed IN REactjs');
    });
  };

  const isUserAvailable = () => {
    const data = new FormData();
    data.append('customermobile', mobileNumber.value);
    data.append('CustomerName', 'Empty');
    axios.post(`https://localhost:44348/api/home/is-cutomer-available`, data).then((res) => {
      alert(res.data);
    });
  };

  const storeCustomer = () => {
    const customerObj = {};
    customerObj.mobileNumber = mobileNumber;
    customerObj.custName = custName;
    customerObj.custAddress = custAddress;
    customerObj.totalAmount = totalCost;
    const promise = customerRegistration(customerObj);

    promise
      .then((res) => {})
      .catch((e) => {
        console.log(e);
      });
  };

  const cartList = cartItems.map((item, i) => {
    return (
      <tr key={i}>
        <td>
          {item.productName}{' '}
          <img src={baseUrl + '/' + item.productImage} alt="NA" style={{ width: '50px', height: '50px' }} />
        </td>
        <td>{item.size}</td>
        <td>{item.cost}</td>

        <td>
          <a href="#" onClick={() => cartItemDecrement(item, cartItems)}>
            -
          </a>
          {item.Quantity}
          <a href="#" onClick={() => cartItemIncrement(item, cartItems)}>
            +
          </a>
        </td>

        <td>
          <button className="btn btn-success" onClick={() => removeCart(item, cartItems)}>
            X
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="cardUserPage">
      <div className="cardSection">
        <p style={{ textAlign: 'center' }}>Info Table Added Item in Cart {totalProducts}</p>
        <table className="cardPaymentTable" id="cardPaymentTable">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Size</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>{cartList}</tbody>
        </table>
        Total Cost to Pay {totalCost}
        <input type="button" class="btn btn-info" value="Store" onClick={() => handleClick(cartItems)} />
      </div>
      <div className="userSection">
        <label>MobileId</label>
        <input type="text" id="txtMobile" {...mobileNumber} />
        <input type="button" value="Is-UserAvailable?" id="btnCheckUserAvailable" onClick={isUserAvailable} />
        <label>Name</label>
        <input type="text" id="txtName" {...custName} />
        <label>Address</label>
        <input type="text" id="txtAddress" {...custAddress} />
        <label>TotalAmount</label>
        <input type="text" id="txtAmount" value={totalCost} />
        <input type="button" value="Store" id="btnUserStore" />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.CartItems.items,
  };
};

const mapDispatchToProps = {
  removeCart,
  cartItemIncrement,
  cartItemDecrement,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
