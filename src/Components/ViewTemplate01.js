import React, { useState, useEffect } from 'react';
import SelectField from '../atoms/Select/index';
import { getCategoryList, getProductById, GetSizesInDB, GetDataViewTemplate01API } from '../shared/utils/apicalls';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ViewTemplate01() {
  const [title, setTitle] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [categoryList, setCategoryList] = useState([]);
  const [prodList, setProdList] = useState([]);
  const [sizeList, setSizeList] = useState([]);
  const [categoryValue, setSelectValueCategory] = useState('');
  const [productValue, setSelectValueProduct] = useState('');
  const [sizeValue, setSelectValueSize] = useState('');
  const [type, setType] = useState('');

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

  const handleDateChange = () => {};

  const handleButtonClick = () => {
    let obj = {};
    obj.categoryValue = categoryValue;
    obj.productValue = productValue;
    obj.sizeValue = sizeValue;
    obj.fromDate = fromDate;
    obj.endDate = endDate;
    const promise = GetDataViewTemplate01API(obj, type);
    promise
      .then((res) => {
        let data = res.data;
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        alert('Error Occured while Fetching Report');
      });
  };

  return (
    <div className="div-ViewTemplate01">
      <div className="div-ViewTemplate01-InnerDiv">
        <h3>{title}</h3>
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
          <label>
            <b>From Date</b>
          </label>
          <DatePicker
            selected={fromDate}
            onSelect={handleDateChange}
            onChange={(date) => setFromDate(date)}
            showYearDropdown
            scrollableMonthYearDropdown
          />
        </div>
        <div>
          <label>
            <b>End Date</b>
          </label>
          <DatePicker
            selected={endDate}
            onSelect={handleDateChange}
            onChange={(date) => setEndDate(date)}
            showYearDropdown
            scrollableMonthYearDropdown
          />
        </div>
        <div>
          <label></label>
          <input type="button" value="GetData" onClick={handleButtonClick} id="btnGetReportData" />
        </div>
      </div>
    </div>
  );
}

export default ViewTemplate01;
