import React, { useState, useEffect } from 'react';
import { GetModifitedBillsAPI, GetTxReverseHistoryDataAPI } from '../shared/utils/apicalls';
import {
  generateHeaderDataForTable,
  generateBodyDataForTable,
  jsPDFTableCreationForReports,
} from '../shared/utils/helper';

function ModifiedBillsPage() {
  const [billData, setBillData] = useState([]);
  const [valid, setValid] = useState(false);
  const [dummyDate, setDummyDate] = useState(new Date());
  useEffect(() => {
    const promise = GetModifitedBillsAPI();
    promise
      .then((res) => {
        let data = res.data;
        if (data.length > 0 && data[0].billnumber) {
          setValid(true);
          setBillData(data);
        } else {
          setValid(false);
          setBillData(data);
        }
      })
      .catch((err) => {
        console.log(err);
        setValid(false);
        alert('Error occured while Pending Bills');
      });
  }, []);

  const getReverseHistory = (billno) => {
    const Promise2 = GetTxReverseHistoryDataAPI(billno);
    Promise2.then((res) => {
      let data = res.data;
      if (typeof data === 'object') {
        debugger;
        const header = generateHeaderDataForTable('TXREVERSEHISTORY');
        const rows = generateBodyDataForTable(data, 'TXREVERSEHISTORY');
        jsPDFTableCreationForReports(header, rows, dummyDate, dummyDate, 'Reverse History', 'TXREVERSEHISTORY');
      } else {
        alert(data);
      }
    }).catch((err) => {
      console.log(err);
      alert('Error Occured while Fetching Reversal Data');
    });
  };

  const tableBodyData =
    valid === true
      ? billData.map((item, index) => {
          return (
            <tr id={index}>
              <td>{item.billnumber}</td>
              <td>{item.customerid}</td>
              <td>
                <input
                  type="button"
                  value="Get"
                  onClick={() => getReverseHistory(item.billnumber)}
                  className="btn btn-outline-primary"
                  style={{ padding: '2px 15px' }}
                />
              </td>
            </tr>
          );
        })
      : '';

  return (
    <div className="div-ModifiedBillsPage">
      <h4 style={{ textAlign: 'center', marginBottom: '30px' }}>Modified Bills</h4>
      <div className="table-responsive">
        <table className="table-hover">
          <thead>
            <tr>
              <th>Bill Number</th>
              <th>Customer ID</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{tableBodyData}</tbody>
        </table>
      </div>
    </div>
  );
}

export default ModifiedBillsPage;
