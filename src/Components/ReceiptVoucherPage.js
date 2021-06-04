import React, { useState } from 'react';
import { getCustomerAccountAPI, setCustomerAccountCreditAPI } from '../shared/utils/apicalls';
import { jsPDFTableCreation } from '../shared/utils/helper';

function ReceiptVoucherPage() {
  const [customerName, setCustomerName] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const [textNarration, setTextNarration] = useState('');
  const [errorMessage, setErroMessage] = useState('');

  const handleSearchClick = () => {
    if (searchValue != '') {
      const promise = getCustomerAccountAPI(searchValue);
      promise
        .then((res) => {
          let data = res.data;

          if (data.customername) {
            setCustomerName(data.customername);
            setCustomerId(data.customerid);
            setErroMessage('');
          } else {
            setErroMessage(data);
            setCustomerName('');
            setCustomerId('');
          }
        })
        .catch((err) => {
          console.log(err);
          alert('Error Occured while fetching Account Info!');
        });
    } else {
      alert('Please Enter Value');
    }
  };

  const handleCreditClick = () => {
    if (errorMessage === '' && !isNaN(creditAmount) && creditAmount != '') {
      const promise2 = setCustomerAccountCreditAPI(customerId, creditAmount);
      promise2
        .then((res) => {
          alert(res.data);
          if (res.data !== 'Failed') {
            var columns = ['S.No', 'Narration', 'Received'];
            var rows = [[1, textNarration, creditAmount]];
            var voucherType = 'RECEIPT';
            var dataObject = {};
            dataObject.customername = customerName;
            jsPDFTableCreation(columns, rows, dataObject, voucherType);
            setSearchValue('');
            setCreditAmount('');
            setTextNarration('');
            setErroMessage('');
          }
        })
        .catch((err) => {
          console.log(err);
          alert('Error occured while credit account');
        });
    } else {
      alert('Check Your Details');
    }
  };

  return (
    <div className="div-ReceiptVoucherPage">
      <h4 style={{ textAlign: 'center', marginBottom: '30px' }}>Account Credit Section</h4>

      <label>Mobile No or ID </label>
      <div className="input-group">
        <input
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          placeholder="search value.."
          className="form-control"
        />
        <div className="input-group-append">
          <input type="button" value="Search" onClick={handleSearchClick} className="btn btn-info" />
        </div>
      </div>
      <div>
        {customerName === '' ? (
          <label style={{ color: 'red', margin: '20px', fontWeight: 'bold' }}>{errorMessage}</label>
        ) : (
          <label style={{ margin: '20px 10px' }}>
            <b> Customer Name</b>
            <span style={{ color: 'blue', marginLeft: '20px', fontWeight: 'bold' }}> {customerName}</span>
          </label>
        )}
      </div>
      <div className="form-group">
        <label>Received Amount </label>
        <input
          type="text"
          onChange={(e) => setCreditAmount(e.target.value)}
          value={creditAmount}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Remarks </label>
        <input
          type="text"
          onChange={(e) => setTextNarration(e.target.value)}
          value={textNarration}
          className="form-control"
        />
      </div>
      <div>
        <input type="button" value="SET-CREDIT" onClick={handleCreditClick} className="getbtn btn btn-primary mt-3" />
      </div>
    </div>
  );
}

export default ReceiptVoucherPage;
