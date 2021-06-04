import React, { useState } from 'react';
import { GlobalCashCreditDebitAPI } from '../shared/utils/apicalls';
import { jsPDFTableCreation } from '../shared/utils/helper';

function GlobalCashDebitPage() {
  const [amount, setAmount] = useState('');
  const [remarks, setRemarks] = useState('');

  const handleClick = () => {
    if (!isNaN(amount) && amount != '') {
      const promise = GlobalCashCreditDebitAPI(amount, 'DEBIT');
      promise
        .then((res) => {
          if (res.data !== 'Failed') {
            alert(res.data);
            let header = ['S.No', 'Narration', 'Amount'];
            let rows = [[1, remarks, amount]];
            let obj = {
              customername: 'Global-Cash',
            };
            jsPDFTableCreation(header, rows, obj, 'DEBIT');
            setAmount('');
            setRemarks('');
          } else {
            alert('Not Completed');
          }
        })
        .catch((err) => {
          console.log(err);
          alert('Error Occured while Modifying Global Cash');
        });
    } else {
      alert('Please check your Info');
    }
  };

  return (
    <div className="div-GlobalCashDebitPage">
      <h4 style={{ textAlign: 'center', marginBottom: '30px' }}>Global Cash Debit Section</h4>
      <div className="form-group">
        <label>Set Debit Amount</label>
        <input
          type="text"
          placeholder="Enter here.."
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Remarks</label>
        <input
          type="text"
          placeholder="Narration.."
          onChange={(e) => setRemarks(e.target.value)}
          value={remarks}
          className="form-control"
        />
      </div>
      <div>
        <input type="button" value="Debit" onClick={handleClick} className="getbtn btn btn-primary mt-3" />
      </div>
    </div>
  );
}

export default GlobalCashDebitPage;
