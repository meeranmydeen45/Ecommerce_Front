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
      <h3 style={{ textAlign: 'center', marginBottom: '50px' }}>Shop Cash Position</h3>
      <div id="div-Cash">{cashPosition} INR</div>
    </div>
  );
}

export default CashPositionPage;
