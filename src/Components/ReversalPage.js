import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCategoryList, getProductById, GetSizesInDB } from '../shared/utils/apicalls';
import useTextBoxControl from '../shared/utils/useTexBoxControl';
import SelectField from '../atoms/Select/index';

function ReversalPage() {
  const [categoryList, setCategoryList] = useState([]);
  const [prodList, setProdList] = useState([]);
  const [sizeList, setSizeList] = useState([]);
  const [selectValueCategory, setSelectValueCategory] = useState('');
  const [selectValueProduct, setSelectValueProduct] = useState('');
  const [selectValueSize, setSelectValueSize] = useState('');
  const getQuantity = useTextBoxControl('');
  const getUnitPrice = useTextBoxControl('');

  //Use Effect for - Get Categories
  useEffect(() => {
    const fetchData = () => {
      try {
        const promise = getCategoryList();

        promise.then((res) => {
          setCategoryList(res.data);
        });
      } catch {}
    };
    fetchData();
  }, []);

  //Use Effect for - Get All Sizes for Dropdown
  useEffect(() => {
    const getSizes = () => {
      try {
        const promise1 = GetSizesInDB();
        promise1.then((res) => {
          setSizeList(res.data);
        });
      } catch {}
    };
    getSizes();
  }, []);

  const handleSelectCategory = (e) => {
    setSelectValueCategory(e.target.value);
    const promise1 = getProductById(e.target.value);
    if (promise1) {
      promise1.then((res) => {
        setProdList(res.data);
      });
    }
  };

  const handleSelectProduct = (e) => {
    setSelectValueProduct(e.target.value);
  };

  const handleSelectSizes = (e) => {
    setSelectValueSize(e.target.value);
  };

  const handleReverseClick = () => {
    console.log(getQuantity.value);
    console.log(getUnitPrice.value);
    console.log(selectValueCategory);
    console.log(selectValueProduct);
    console.log(selectValueSize);
  };
  return (
    <div className="div-ReversalPage">
      <div>
        <label>Select Category</label>
        <SelectField data={categoryList} onChange={handleSelectCategory} />
      </div>

      <div>
        <label>Select Product</label>
        <SelectField data={prodList} onChange={handleSelectProduct} />
      </div>

      <div>
        <label>Choose Size</label>
        <SelectField data={sizeList} onChange={handleSelectSizes} />
      </div>

      <div>
        <label>No. of Quantity:</label>
        <input type="text" {...getQuantity} />
      </div>

      <div>
        <label>Unit Price</label>
        <input type="text" {...getUnitPrice} />
      </div>

      <div>
        <input
          type="button"
          value="Change"
          style={{ marginLeft: '150px', width: '200px' }}
          onClick={handleReverseClick}
        />
      </div>
    </div>
  );
}

export default ReversalPage;
