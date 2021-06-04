import React, { useState } from 'react';
import { GetCustomerById, CreateCustomerAccount } from '../shared/utils/apicalls';

function CustomerAccountPage() {
  const [customerId, setCustomerId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [isStatusValid, setStatusValid] = useState(false);

  const handleGetCustomerClick = () => {
    if (!isNaN(customerId)) {
      const promise = GetCustomerById(customerId);
      promise
        .then((res) => {
          let data = res.data;
          if (data.customerName) {
            setStatusValid(true);
            setCustomerName(data.customerName);
            setCustomerMobile(data.customermobile);
          } else {
            setCustomerName('');
            setCustomerMobile('');
            alert(data);
          }
        })
        .catch((err) => {
          console.log(err);
          alert('Error Occured while GetCustomerData!');
        });
    } else {
      alert('Enter Valid Customer Id');
    }
  };
  const handleCreateAccountClick = () => {
    if (isStatusValid) {
      const promise2 = CreateCustomerAccount(customerId, customerName, customerMobile);
      promise2
        .then((res) => {
          setCustomerId('');
          setCustomerName('');
          setCustomerMobile('');
          setStatusValid(false);
          alert(res.data);
        })
        .catch((err) => {
          console.log(err);
          alert('Error Occured While Creating Account');
        });
    } else {
      alert('Incorrect Details!');
    }
  };

  return (
    <div className="div-CustomerAccountPage">
      <h4 style={{ textAlign: 'center', marginBottom: '30px' }}>Create Account for Customer</h4>
      <div className="input-group form-group">
        <input
          type="text"
          placeholder="Enter Customer ID.."
          onChange={(e) => setCustomerId(e.target.value)}
          value={customerId}
          className="form-control"
        />
        <div className="input-group-append">
          <input type="button" value="GetCustomer" onClick={handleGetCustomerClick} className="getbtn btn btn-info" />
        </div>
      </div>
      {isStatusValid === true ? (
        <div style={{ padding: '20px' }}>
          <div>
            <label style={{ marginRight: '50px' }}>Customer Name</label>
            <label id="labelValue">{customerName}</label>
          </div>
          <div>
            <label style={{ marginRight: '40px' }}>Customer Mobile</label>
            <label id="labelValue">{customerMobile}</label>
          </div>
        </div>
      ) : (
        ''
      )}

      <div>
        <input
          type="button"
          value="CreateAccount"
          onClick={handleCreateAccountClick}
          className="getbtn btn btn-primary"
        />
      </div>
    </div>
  );
}

export default CustomerAccountPage;
