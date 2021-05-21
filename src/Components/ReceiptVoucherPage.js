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
      <h2>Receipt Voucher</h2>
      <div>
        <label>Mobile No or ID: </label>
        <input
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          placeholder="TypeHere..."
        />
        <input type="button" value="Search" onClick={handleSearchClick} />
      </div>
      <div>{customerName === '' ? <label>{errorMessage}</label> : <label>Customer Name {customerName}</label>}</div>
      <div>
        <label>Received Amount: </label>
        <input type="text" onChange={(e) => setCreditAmount(e.target.value)} value={creditAmount} />
      </div>
      <div>
        <label>Remarks: </label>
        <input type="text" onChange={(e) => setTextNarration(e.target.value)} value={textNarration} />
      </div>
      <div>
        <input type="button" value="SetCredit" onClick={handleCreditClick} id="btnHandleCreditClick" />
      </div>
    </div>
  );
}

export default ReceiptVoucherPage;
