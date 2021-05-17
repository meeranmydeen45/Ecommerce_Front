import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  getCategoryList,
  getProductById,
  GetSizesInDB,
  GetBillData,
  PostReverseEntryData,
} from '../shared/utils/apicalls';
import useTextBoxControl from '../shared/utils/useTexBoxControl';
import SelectField from '../atoms/Select/index';
import $ from 'jquery';

function ReversalPage() {
  const [categoryList, setCategoryList] = useState([]);
  const [prodList, setProdList] = useState([]);
  const [sizeList, setSizeList] = useState([]);
  const [selectValueCategory, setSelectValueCategory] = useState('');
  const [selectValueProduct, setSelectValueProduct] = useState('');
  const [selectValueSize, setSelectValueSize] = useState('');
  const [isBillNumberValid, setBillNumberValidStatus] = useState(false);
  const [isFieldsStatus, setFieldStatus] = useState(false);
  const getQuantity = useTextBoxControl('');
  const getSalePrice = useTextBoxControl('');
  const getBillNumber = useTextBoxControl('');

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

  const getBillData = () => {
    if (!isNaN(getBillNumber.value)) {
      const promise2 = GetBillData(getBillNumber.value);
      promise2.then((res) => {
        let data = res.data;
        if (data.customer) {
          setBillNumberValidStatus(true);
          $('#txtBillNumber').val('');
        } else {
          setBillNumberValidStatus(false);
        }
      });
    } else {
      setBillNumberValidStatus(false);
      alert('Enter Valid Data');
    }
  };

  const handleReverseClick = () => {
    var obj = {};
    obj.Billnumber = $('#txtBillNumber').val();
    obj.Productid = selectValueProduct;
    obj.Size = selectValueSize;
    obj.Quantity = getQuantity.value;
    obj.Saleprice = getSalePrice.value;
    if (isBillNumberValid && !isNaN(obj.Quantity) && !isNaN(obj.Saleprice)) {
      console.log(obj);
      const promise3 = PostReverseEntryData(obj);
      promise3
        .then((res) => {
          alert(res.data);
        })
        .catch((err) => {
          console.log(err);
          alert('Error Occured while Reversing');
        });
    } else {
      alert('Incorrect Details!');
    }
  };

  const billStatusText = isBillNumberValid == true ? 'Valid-Bill' : 'Check-Bill';

  return (
    <div className="div-ReversalPage">
      <div>
        <label>Enter Bill Number:</label>
        <input type="text" {...getBillNumber} id="txtBillNumber" />
        <input type="button" value="GetBill" onClick={getBillData} />
      </div>

      <div>
        <p id="ptagBillText">
          <b>{billStatusText}</b>
        </p>
      </div>

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
        <input type="text" {...getSalePrice} />
      </div>

      <div>
        <input
          type="button"
          value="Reverse"
          style={{ marginLeft: '150px', width: '200px' }}
          onClick={handleReverseClick}
        />
      </div>
    </div>
  );
}

export default ReversalPage;
