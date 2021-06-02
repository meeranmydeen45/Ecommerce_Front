import React, { useState, useEffect } from 'react';
import { GetCustomerByMobileNumberAPI, GetDataViewTemplate02API } from '../shared/utils/apicalls';
import {
  generateHeaderDataForTable,
  generateBodyDataForTable,
  jsPDFTableCreationForReports,
} from '../shared/utils/helper';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function ViewTemplate02({ ReportType, Title }) {
  const [fromDate, setFromDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchValue, setSearchValue] = useState('');
  const [nameLable, setNameLable] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [validate, setValidate] = useState(true);

  const handleClickToValidate = () => {
    let mobileNumber = searchValue.trim();
    if (!isNaN(mobileNumber)) {
      const PromiseCustomer = GetCustomerByMobileNumberAPI(mobileNumber);
      PromiseCustomer.then((res) => {
        let data = res.data;
        if (typeof data === 'object') {
          setValidate(true);
          setNameLable(data.customerName);
          setCustomerId(data.customerId);
        } else {
          setValidate(false);
          alert(data);
        }
      }).catch((err) => {
        console.log(err);
        setValidate(false);
        alert('Error Occured while Fetching Customer Details!!');
      });
    }
  };

  const handleClickToGetData = () => {
    let obj = {};
    obj.FromDate = fromDate;
    obj.EndDate = endDate;
    obj.MobileNumber = searchValue;
    obj.Customerid = customerId;
    if (validate) {
      const PromiseReportData = GetDataViewTemplate02API(obj, ReportType);
      PromiseReportData.then((res) => {
        let data = res.data;
        if (typeof data === 'object') {
          const header = generateHeaderDataForTable(ReportType);
          const rows = generateBodyDataForTable(data, ReportType);
          jsPDFTableCreationForReports(header, rows, fromDate, endDate, Title, ReportType);
        } else {
          alert(data);
        }
      }).catch((err) => {
        console.log(err);
        alert('Error Occured while Fetching Report Data');
      });
    }
  };

  return (
    <div className="div-ViewTemplate02">
      <div className="div-ForDate">
        <div style={{ backgroundColor: 'red', width: '300px' }}>
          <label>
            <b>From Date</b>
          </label>
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            showYearDropdown
            scrollableMonthYearDropdown
          />
        </div>
        <div style={{ backgroundColor: 'green' }}>
          <label>
            <b>End Date</b>
          </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showYearDropdown
            scrollableMonthYearDropdown
          />
        </div>
        <div></div>
      </div>
      <div style={{ backgroundColor: 'yellow' }}>
        <label>Customer Mobile</label>
        <input type="text" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
        <input type="button" value="Check" onClick={handleClickToValidate} />
      </div>
      <div style={{ backgroundColor: 'pink' }}>
        {validate == true ? (
          <div>
            <label>Name:</label>
            <label>{nameLable}</label>
          </div>
        ) : (
          ''
        )}
      </div>
      <div style={{ backgroundColor: 'teal' }}>
        <input type="button" value="GetData" onClick={handleClickToGetData} />
      </div>
    </div>
  );
}
