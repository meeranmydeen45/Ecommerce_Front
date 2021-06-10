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
  const [updateStatus, setUpdateStatus] = useState(false);

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
        let paymentInfoDiv = document.getElementsByTagName('div');
        paymentInfoDiv[18].classList.add('payment-table-anime');
        console.log(paymentInfoDiv[18].className);
      } else {
        alert('Mobile No. not registered with Us');
        setCustomerStatus(false);
      }
    });
  };

  const btnUpdateClick = () => {
    setUpdateStatus(true);
    setCustomerStatus(false);
  };

  const storeCustomer = () => {
    const mobile = getTxtBoxValue.customerMobile;
    const name = getTxtBoxValue.customerName;
    const address = getTxtBoxValue.customerAddress;

    if (!isNaN(mobile) && name !== '' && address !== '') {
      const promise = customerRegistration(getTxtBoxValue, updateStatus);
      promise
        .then((res) => {
          alert('Registed Sucessfully');
          setTxtBoxValue({
            customerMobile: '',
            customerName: '',
            customerAddress: '',
            customerId: '',
          });
          setUpdateStatus(false);
          setCustomerStatus(false);
        })
        .catch((e) => {
          console.log(e);
          alert('Error Occured while Customer Registration');
        });
    } else {
      alert('Please check your customer Info');
    }
  };

  const makePurchase = async (cartItems) => {
    let discount = getTxtBoxValue.customerDiscount;
    console.log(!isNaN(discount));
    console.log(customerStatus);
    console.log(cartItems.length);
    if (!isNaN(discount) && customerStatus && cartItems.length > 0) {
      let servertData = '';
      const CustwithOrders = {};
      CustwithOrders.cartItems = cartItems;
      CustwithOrders.customer = getTxtBoxValue;
      CustwithOrders.totalCost = totalCost;
      await axios.post(`https://localhost:44348/api/home/pruchase`, CustwithOrders).then((res) => {
        servertData = res.data;
      });
      discount = getTxtBoxValue.customerDiscount === '' ? 0 : discount;
      const div = await designPDFwithData(servertData, discount);
      generatePDFandByteArray(div, servertData, getTxtBoxValue.customerDiscount);
      removeCart(null, null, true);
      totalCost = '';
      totalProducts = '';
      setTxtBoxValue({
        customerMobile: '',
        customerName: '',
        customerAddress: '',
        customerId: '',
      });

      setCustomerStatus(false);
    } else {
      alert('Please Check Your Details');
    }
  };

  const cartList = cartItems.map((item, i) => {
    return (
      <tr key={i}>
        <td>{item.productName} </td>
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
          <button
            className="btn btn-outline-info"
            onClick={() => removeCart(item, cartItems, false)}
            style={{ padding: '0px 10px' }}
          >
            x
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="cardUserPage">
      <h4 style={{ textAlign: 'center' }}>Purchase Confirmation Page</h4>
      <div className="cardUserPage-Full-Section">
        <div className="cardUserPage-Left-Section">
          <p style={{ textAlign: 'center' }}>Added Item in Cart {totalProducts}</p>

          <div className="table-responsive" style={{ marginBottom: '50px' }}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Size</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Tot.cost</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>{cartList}</tbody>
            </table>
          </div>
          <div className="payment-table-below">
            <p>
              Customer ID
              <span style={{ fontWeight: 'bold', color: 'blue', marginLeft: '10%' }}> {getTxtBoxValue.customerId}</span>
            </p>
            <label>Enter Discount</label>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="customerDiscount"
                id="txtDiscount"
                placeholder="Amount Here."
                value={getTxtBoxValue.customerDiscount}
                onChange={hanldeInputChange}
              />
            </div>
            <p>
              total <span style={{ marginLeft: '18%', fontWeight: 'bold', color: 'blue' }}>{totalCost} INR</span>
            </p>
            <div>
              <input
                type="button"
                class="btn btn-outline-primary btn-block"
                value="PURCHASE"
                onClick={() => makePurchase(cartItems)}
              />
            </div>
          </div>
        </div>

        <div className="cardUserPage-Right-Section">
          <p style={{ textAlign: 'center' }}>Customer Selection Section</p>
          <label>Mobile Number</label>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="customerMobile"
              id="txtMobile"
              placeholder="Enter Here.."
              value={getTxtBoxValue.customerMobile}
              onChange={hanldeInputChange}
            />
          </div>
          <div className="form-group">
            <input type="button" value="Is-UserAvailable?" onClick={isUserAvailable} className="btn btn-outline-info" />
            <input type="button" value="Update" onClick={btnUpdateClick} className="btn btn-outline-success" />
          </div>
          <label>Name</label>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="customerName"
              id="txtName"
              value={getTxtBoxValue.customerName}
              onChange={hanldeInputChange}
            />
          </div>
          <label>Address</label>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="customerAddress"
              id="txtAddress"
              value={getTxtBoxValue.customerAddress}
              onChange={hanldeInputChange}
            />
          </div>
          <div>
            <input
              type="button"
              value="REGISTER"
              onClick={storeCustomer}
              disabled={customerStatus}
              className="btn btn-primary mt-3"
              style={{ padding: '5px 20px' }}
            />
          </div>
        </div>
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
