import React, { useState } from 'react';
import { GetBillPdfAPI, GeneatePDFwithBase64 } from '../shared/utils/apicalls';

function ReprintBillPage() {
  const [textValue, setTextValue] = useState('');

  const handlePrintClick = () => {
    const promise = GetBillPdfAPI(textValue);
    promise
      .then((res) => {
        let data = res.data;
        console.log(data);
        if (data != '') {
          GeneatePDFwithBase64(data);
        } else {
          alert('Bill Number Not Found');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Error occured while Fetching Reprint Bill');
      });
  };

  return (
    <div className="div-ReprintBillPage">
      <h4 style={{ textAlign: 'center', marginBottom: '60px' }}>Bills Reprint Section</h4>
      <div className="input-group form-group">
        <input
          type="text"
          onChange={(e) => setTextValue(e.target.value)}
          value={textValue}
          className="form-control"
          placeholder="Enter Bill No."
        />
        <div className="input-group-append">
          <input type="button" value="Search" onClick={handlePrintClick} className="getbtn btn btn-primary" />
        </div>
      </div>
    </div>
  );
}

export default ReprintBillPage;
