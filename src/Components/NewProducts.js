import React, { useState, useEffect } from 'react';
import { getCategoryList, handleSaveNewProduct } from '../shared/utils/apicalls';
import SelectField from '../atoms/Select/index';
import InputField from '../atoms/Input/index';

function NewProducts() {
  const [dataList, setDataList] = useState([]);
  const [selectValue, setSelectValue] = useState('');
  const [txtBoxValue, setTxtBoxValue] = useState('');
  let isData = false;
  let idWithName = {};

  useEffect(() => {
    const fetchData = () => {
      try {
        const promise = getCategoryList();
        promise.then((res) => {
          setDataList(res.data);
        });
      } catch {}
    };
    fetchData();
    return () => {
      isData = true;
    };
  }, []);

  const handleSaveClick = () => {
    let promise = handleSaveNewProduct(idWithName);
    promise.then((res) => {
      alert(res.data);
    });
  };

  const handleSelect = (e) => {
    setSelectValue(e.target.value);
  };

  const handleTextBox = (e) => {
    setTxtBoxValue(e.target.value);
  };
  idWithName.id = selectValue;
  idWithName.name = txtBoxValue;
  return (
    <div className="newProducts">
      <div className="newProducts-Inner">
        <div>
          <b>Select Category</b>
          <SelectField data={dataList} onChange={handleSelect} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <b>Register Your New Products</b>
        </div>
        <input type="text" value={txtBoxValue} onChange={handleTextBox} />
        <input type="button" value="Save" onClick={handleSaveClick} className="buttonNewRegister" />
        <input type="button" value="Show" className="buttonNewRegister" />
      </div>
    </div>
  );
}

export default NewProducts;
