import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { removeCart, cartItemIncrement, cartItemDecrement } from '../Redux/Actions/CartAction';
import { customerRegistration } from '../shared/utils/apicalls';
import { designPDFwithData, generatePDFandByteArray } from '../shared/utils/helper';

function CartList({ cartItems, removeCart, cartItemIncrement, cartItemDecrement }) {
  const baseUrl = 'https://localhost:44348/Images/';

  let totalCost = cartItems.reduce((sum, item) => sum + item.cost * item.Quantity, 0);
  let totalProducts = cartItems.reduce((sum, item) => sum + item.Quantity, 0);

  const initialValue = {
    customerMobile: '',
    customerName: '',
    customerAddress: '',
    customerId: '',
    customerDiscount: '',
  };

  const [getTxtBoxValue, setTxtBoxValue] = useState(initialValue);
  const [customerStatus, setCustomerStatus] = useState(false);

  const hanldeInputChange = (e) => {
    const { name, value } = e.target;
    setTxtBoxValue({ ...getTxtBoxValue, [name]: value });
  };

  const isUserAvailable = () => {
    const data = new FormData();
    data.append('customermobile', getTxtBoxValue.customerMobile);
    data.append('CustomerName', 'Empty');
    axios.post(`https://localhost:44348/api/home/is-cutomer-available`, data).then((res) => {
      if (typeof res.data === 'object') {
        setCustomerStatus(true);
        const { customermobile, customerName, customeraddress, customerId } = res.data;
        setTxtBoxValue({
          customerMobile: customermobile,
          customerName: customerName,
          customerAddress: customeraddress,
          customerId: customerId,
        });
      } else {
        alert('Mobile No. not registered with Us');
      }
    });
  };

  const storeCustomer = () => {
    const promise = customerRegistration(getTxtBoxValue);

    promise
      .then((res) => {})
      .catch((e) => {
        console.log(e);
      });
  };

  const makePurchase = async (cartItems) => {
    let servertData = '';
    const CustwithOrders = {};
    CustwithOrders.cartItems = cartItems;
    CustwithOrders.customer = getTxtBoxValue;
    CustwithOrders.totalCost = totalCost;
    await axios.post(`https://localhost:44348/api/home/pruchase`, CustwithOrders).then((res) => {
      servertData = res.data;
    });
    const div = await designPDFwithData(servertData, getTxtBoxValue.customerDiscount);
    generatePDFandByteArray(div, servertData, getTxtBoxValue.customerDiscount);
  };

  const cartList = cartItems.map((item, i) => {
    return (
      <tr key={i}>
        <td>
          {item.productName}{' '}
          <img src={baseUrl + '/' + item.productImage} alt="NA" style={{ width: '50px', height: '50px' }} />
        </td>
        <td>{item.size}</td>

        <td>
          <a href="#" onClick={() => cartItemDecrement(item, cartItems)}>
            -
          </a>
          {item.Quantity}
          <a href="#" onClick={() => cartItemIncrement(item, cartItems)}>
            +
          </a>
        </td>
        <td>{item.cost}</td>
        <td>{parseInt(item.Quantity) * parseInt(item.cost)}</td>
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
        <b>Customer ID: {getTxtBoxValue.customerId}</b>
        <table className="cardPaymentTable" id="cardPaymentTable">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Size</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Tot.cost</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>{cartList}</tbody>
        </table>
        Total Cost to Pay {totalCost}
        <input type="button" class="btn btn-info" value="Store" onClick={() => makePurchase(cartItems)} />
      </div>
      <div className="userSection">
        <label>MobileId</label>
        <input
          type="text"
          name="customerMobile"
          id="txtMobile"
          value={getTxtBoxValue.customerMobile}
          onChange={hanldeInputChange}
        />
        <input type="button" value="Is-UserAvailable?" id="btnCheckUserAvailable" onClick={isUserAvailable} />
        <label>Name</label>
        <input
          type="text"
          name="customerName"
          id="txtName"
          value={getTxtBoxValue.customerName}
          onChange={hanldeInputChange}
        />
        <label>Address</label>
        <input
          type="text"
          name="customerAddress"
          id="txtAddress"
          value={getTxtBoxValue.customerAddress}
          onChange={hanldeInputChange}
        />
        <label>TotalAmount</label>
        <input type="text" id="txtAmount" value={totalCost} />
        <label>Discount</label>
        <input
          type="text"
          name="customerDiscount"
          id="txtDiscount"
          value={getTxtBoxValue.customerDiscount}
          onChange={hanldeInputChange}
        />
        <input type="button" value="Store" id="btnUserStore" onClick={storeCustomer} disabled={customerStatus} />
      </div>
      <div id="printAreaH"></div>
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
