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
    console.log(mobile);
    console.log(!isNaN(mobile));
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
          <button className="btn btn-success" onClick={() => removeCart(item, cartItems, false)}>
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
        <div>
          <label>Discount</label>
          <input
            type="text"
            name="customerDiscount"
            id="txtDiscount"
            value={getTxtBoxValue.customerDiscount}
            onChange={hanldeInputChange}
          />
        </div>
        <div>Total Cost to Pay {totalCost}</div>
        <div>
          <input type="button" class="btn btn-info" value="Store" onClick={() => makePurchase(cartItems)} />
        </div>
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
        <div>
          <input type="button" value="Is-UserAvailable?" id="btnCheckUserAvailable" onClick={isUserAvailable} />
          <input type="button" value="Update" id="btnUpdate" onClick={btnUpdateClick} />
        </div>
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
