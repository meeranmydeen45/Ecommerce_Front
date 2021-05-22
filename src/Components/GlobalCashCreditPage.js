import React, { useState } from 'react';
import { GlobalCashCreditDebitAPI } from '../shared/utils/apicalls';
import { jsPDFTableCreation } from '../shared/utils/helper';

function GlobalCashCreditPage() {
  const [amount, setAmount] = useState('');
  const [remarks, setRemarks] = useState('');

  const handleClick = () => {
    if (!isNaN(amount) && amount != '') {
      const promise = GlobalCashCreditDebitAPI(amount, 'CREDIT');
      promise
        .then((res) => {
          if (res.data !== 'Failed') {
            alert(res.data);
            let header = ['S.No', 'Narration', 'Amount'];
            let rows = [[1, remarks, amount]];
            let obj = {
              customername: 'Global-Cash',
            };
            jsPDFTableCreation(header, rows, obj, 'RECEIPT');
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
    <div className="div-GlobalCashCreditPage">
      <h3>Global Cash Credit Section</h3>
      <div>
        <label>Enter</label>
        <input type="text" placeholder="Amount.." onChange={(e) => setAmount(e.target.value)} value={amount} />
      </div>
      <div>
        <label>Remarks</label>
        <input type="text" placeholder="Narration.." onChange={(e) => setRemarks(e.target.value)} value={remarks} />
      </div>
      <div>
        <input type="button" value="Credit" onClick={handleClick} id="btnGlobalCashTx" />
      </div>
    </div>
  );
}

export default GlobalCashCreditPage;
