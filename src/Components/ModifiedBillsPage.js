import React, { useState, useEffect } from 'react';
import { GetModifitedBillsAPI } from '../shared/utils/apicalls';

function ModifiedBillsPage() {
  const [billData, setBillData] = useState([]);
  const [valid, setValid] = useState(false);
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

  const tableBodyData =
    valid === true
      ? billData.map((item, index) => {
          return (
            <tr id={index}>
              <td>{item.billnumber}</td>
              <td>{item.customerid}</td>
            </tr>
          );
        })
      : '';

  return (
    <div className="div-ModifiedBillsPage">
      <h3>Modified Bills</h3>
      <div>
        <table>
          <thead>
            <tr>
              <td>BillNumber</td>
              <td>CustomerID</td>
            </tr>
          </thead>
          <tbody>{tableBodyData}</tbody>
        </table>
      </div>
    </div>
  );
}

export default ModifiedBillsPage;
