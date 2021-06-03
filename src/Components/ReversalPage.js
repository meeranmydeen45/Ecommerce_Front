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
    if (!isNaN(getBillNumber.value) && getBillNumber.value != '') {
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
      <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>PRODUCT RETURN ENTRY PAGE</h4>
      <div className="form-group">
        <input
          type="text"
          {...getBillNumber}
          id="txtBillNumber"
          className="form-control"
          placeholder="Enter Bill No.."
        />
        <input type="button" value="GetBill" onClick={getBillData} className="getbtn btn btn-primary" />
      </div>

      <div>
        <p id="ptagBillText">
          <b>{billStatusText}</b>
        </p>
      </div>

      <div>
        <SelectField data={categoryList} onChange={handleSelectCategory} />
      </div>

      <div>
        <SelectField data={prodList} onChange={handleSelectProduct} />
      </div>

      <div>
        <SelectField data={sizeList} onChange={handleSelectSizes} />
      </div>

      <div>
        <input type="text" {...getQuantity} placeholder="Enter Quantity" className="form-control" />
      </div>

      <div>
        <input type="text" {...getSalePrice} placeholder="Enter SoldPrice" className="form-control" />
      </div>

      <div>
        <input
          type="button"
          value="Reverse"
          style={{ maxWidth: '250px', marginTop: '20px', padding: '5px 20px' }}
          onClick={handleReverseClick}
        />
      </div>
    </div>
  );
}

export default ReversalPage;
