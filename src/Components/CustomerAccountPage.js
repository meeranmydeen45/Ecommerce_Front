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
      <div>
        <label>Enter Customer ID:</label>
        <input type="text" onChange={(e) => setCustomerId(e.target.value)} value={customerId} />
        <input type="button" value="GetCustomer" onClick={handleGetCustomerClick} />
      </div>
      <div>
        <label>Customer Name:</label>
        <label>{customerName}</label>
      </div>
      <div>
        <label>Customer Mobile:</label>
        <label>{customerMobile}</label>
      </div>
      <div>
        <input type="button" value="CreateAccount" onClick={handleCreateAccountClick} />
      </div>
    </div>
  );
}

export default CustomerAccountPage;
