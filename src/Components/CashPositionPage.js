import React, { useEffect, useState } from 'react';
import { GetGlobalCashAPI } from '../shared/utils/apicalls';

function CashPositionPage() {
  const [cashPosition, setCashPosition] = useState('');
  useEffect(() => {
    const getGlobalCash = () => {
      const promise = GetGlobalCashAPI();
      promise
        .then((res) => {
          setCashPosition(res.data);
        })
        .catch((err) => {
          console.log(err);
          alert('Error Occured whilte fetching Global Cash!');
        });
    };
    getGlobalCash();
  }, []);
  return (
    <div className="div-CashPositionPage">
      <h3>Your Current Cash Position</h3>
      <br />
      <b>{cashPosition}</b>
    </div>
  );
}

export default CashPositionPage;
