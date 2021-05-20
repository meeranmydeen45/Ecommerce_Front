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
      <div>
        <label>Enter Bill Number: </label>
        <input type="text" onChange={(e) => setTextValue(e.target.value)} value={textValue} />
        <input type="button" value="Search" onClick={handlePrintClick} />
      </div>
    </div>
  );
}

export default ReprintBillPage;
