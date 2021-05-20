import React, { useState, useEffect } from 'react';
import {
  GetAllPendingBillsAPI,
  GetPendingBillByCustomerAPI,
  GetBillPdfAPI,
  GeneatePDFwithBase64,
} from '../shared/utils/apicalls';

function GetPendingBillsPage() {
  const [billData, setBilldata] = useState('');
  const [txtValue, setTxtValue] = useState('');
  const [checkBoxValue, setCheckBoxValue] = useState('');
  const [isCheckBoxValidStatus, setCheckBoxValidStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  let tableBodyData = '';

  useEffect(() => {
    let mounted = true;
    const promise = GetAllPendingBillsAPI();
    promise
      .then((res) => {
        if (mounted) {
          let data = res.data;
          if (data[0].billnumber || data.billnumber) {
            setBilldata(data);
            setErrorMessage('');
          } else {
            setErrorMessage(data);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Error Occured while capturing All pending Bills!!');
      });
    return function cleanup() {
      mounted = false;
    };
  }, []);

  const GenerateTableBody = () => {
    if (billData.length > 0 && billData[0].billnumber) {
      tableBodyData = billData.map((item, index) => {
        return (
          <tr id={index}>
            <td>{item.billnumber}</td>
            <td>{item.pendingamount}</td>
            <td>{item.customername}</td>
            <td>{item.customermobile}</td>
            <td>{item.customerid}</td>
            <td>
              <input type="button" value="GetBill" onClick={(e) => buttonGetBill(item.billnumber)} />
            </td>
          </tr>
        );
      });
    } else if (billData.billNumber) {
      tableBodyData = (
        <tr>
          <td>{billData.billnumber}</td>
          <td>{billData.pendingamount}</td>
          <td>{billData.customername}</td>
          <td>{billData.customermobile}</td>
          <td>{billData.customerid}</td>
          <td>
            <input type="button" value="GetBill" onClick={(e) => buttonGetBill(billData.billnumber)} />
          </td>
        </tr>
      );
    }
  };
  GenerateTableBody();

  const buttonGetBill = (billNumber) => {
    const promise = GetBillPdfAPI(billNumber);
    debugger;
    promise
      .then((res) => {
        let base64Data = res.data;
        GeneatePDFwithBase64(base64Data);
      })
      .catch((err) => {
        console.log(err);
        alert('Error occured while fetch PDF');
      });
  };

  const handleCheckBox = (e) => {
    setCheckBoxValidStatus(true);
    setCheckBoxValue(e.target.value);
  };
  const handleSearchClick = () => {
    if (isCheckBoxValidStatus && txtValue !== '') {
      const promise2 = GetPendingBillByCustomerAPI(txtValue, checkBoxValue);
      promise2
        .then((res) => {
          let data = res.data;
          if (data[0].billnumber || data.billnumber) {
            setBilldata(data);
            setErrorMessage('');
          } else {
            setErrorMessage(data);
          }
        })
        .catch((err) => {
          alert('Error while Fetching BillData of Individual Customer!');
        });
    } else {
      alert('Please Choose search Criteria');
    }
  };

  return (
    <div className="div-GetPendingBillsPage">
      <div>
        <input type="text" onChange={(e) => setTxtValue(e.target.value)} value={txtValue} />
        <input type="button" value="Search" onClick={handleSearchClick} />
      </div>
      <div>
        <input type="radio" name="cust" onChange={handleCheckBox} value="CUSTOMERID" />
        <label for="custId">CustomerID</label>

        <input type="radio" name="cust" onChange={handleCheckBox} value="CUSTOMERMOBILE" />
        <label for="custMobile">Mobile</label>

        <input type="radio" name="cust" onChange={handleCheckBox} value="CUSTOMERNAME" />
        <label for="custName">Name</label>
      </div>
      <div>{errorMessage != '' ? errorMessage : ''}</div>
      <div>
        <tabel id="tableMain">
          <thead>
            <tr>
              <th>BillNo</th>
              <th>PendingAmout</th>
              <th>CustomerName</th>
              <th>CustomerID</th>
              <th>CustomerMobile</th>
              <th>GetBill</th>
            </tr>
          </thead>
          <tbody>{errorMessage == '' ? tableBodyData : ''}</tbody>
        </tabel>
      </div>
    </div>
  );
}
export default GetPendingBillsPage;
