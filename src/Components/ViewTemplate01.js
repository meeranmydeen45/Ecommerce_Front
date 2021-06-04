import React, { useState, useEffect } from 'react';
import SelectField from '../atoms/Select/index';
import { getCategoryList, getProductById, GetSizesInDB, GetDataViewTemplate01API } from '../shared/utils/apicalls';
import {
  generateHeaderDataForTable,
  generateBodyDataForTable,
  jsPDFTableCreationForReports,
} from '../shared/utils/helper';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ViewTemplate01({ ReportType, Title }) {
  const [fromDate, setFromDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [categoryList, setCategoryList] = useState([]);
  const [prodList, setProdList] = useState([]);
  const [sizeList, setSizeList] = useState([]);
  const [categoryValue, setSelectValueCategory] = useState('');
  const [productValue, setSelectValueProduct] = useState('');
  const [sizeValue, setSelectValueSize] = useState('');
  const [groupValue, setGroupValue] = useState('DEFAULT');
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

  const handleSelectGroup = (e) => {
    setGroupValue(e.target.value);
  };

  const handleDateChange = () => {};

  const handleButtonClick = () => {
    let obj = {};
    obj.categoryValue = categoryValue;
    obj.productValue = productValue;
    obj.sizeValue = sizeValue;
    obj.fromDate = fromDate;
    obj.endDate = endDate;
    const promise = GetDataViewTemplate01API(obj, ReportType, groupValue);
    promise
      .then((res) => {
        let data = res.data;
        if (typeof data === 'object') {
          const header = generateHeaderDataForTable(ReportType);
          const rows = generateBodyDataForTable(data, ReportType);
          jsPDFTableCreationForReports(header, rows, fromDate, endDate, Title, ReportType);
        } else {
          alert('Not Found any Records!');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Error Occured while Fetching Report');
      });
  };

  return (
    <div className="div-ViewTemplate01">
      <h4 style={{ textAlign: 'center', marginBottom: '30px' }}>{Title} Section</h4>
      <div className="viewTemplate01-flexbox-section">
        <div className="viewTemplate01-Left-Section">
          <div className="form-group">
            <label>Select Category</label>
            <SelectField data={categoryList} onChange={handleSelectCategory} />
          </div>

          <div className="form-group">
            <label>Select Product</label>
            <SelectField data={prodList} onChange={handleSelectProduct} />
          </div>

          <div className="form-group">
            <label>Choose Size</label>
            <SelectField data={sizeList} onChange={handleSelectSizes} />
          </div>
        </div>
        <div className="viewTemplate01-Right-Section">
          <label>From Date</label>
          <div className="form-group">
            <DatePicker
              selected={fromDate}
              className="form-control"
              id="datepicker"
              onSelect={handleDateChange}
              onChange={(date) => setFromDate(date)}
              showYearDropdown
              scrollableMonthYearDropdown
            />
          </div>
          <label>End Date</label>
          <div className="form-group">
            <DatePicker
              selected={endDate}
              className="form-control"
              id="datepicker"
              onSelect={handleDateChange}
              onChange={(date) => setEndDate(date)}
              showYearDropdown
              scrollableMonthYearDropdown
            />
          </div>
          <label></label>
          <div className="form-group">
            <select onChange={handleSelectGroup} className="form-control">
              <option value="DEFAULT">Choose to Total</option>
              <option value="GROUP">TOTAL</option>
            </select>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: 'red', margin: 'auto', width: '100px' }}>
        <input type="button" value="GET-REPORT" onClick={handleButtonClick} className="getbtn btn btn-primary" />
      </div>
    </div>
  );
}

export default ViewTemplate01;
