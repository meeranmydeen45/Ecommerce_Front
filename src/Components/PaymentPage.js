import React from 'react';
import axios from 'axios';

class PaymentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      txtBillNumber: '',
      txtPay: '',
      customerid: '',
      customerName: '',
      customerMobile: '',
      customerBillAmount: '',
      paymentMode: '',
    };
  }
  render() {
    const handleTextBoxChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e) => {
      this.setState({ paymentMode: e.target.value });
    };

    const buttonGetBillData = () => {
      let formData = new FormData();
      formData.append('Billnumber', this.state.txtBillNumber);
      axios.post(`https://localhost:44348/api/manage/getbilldata`, formData).then((res) => {
        let data = res.data;
        this.setState({
          customerid: data.customer.customerId,
          customerName: data.customer.customerName,
          customerMobile: data.customer.customermobile,
          customerBillAmount: data.totalcost,
        });
      });
    };
    const buttonStoreData = () => {
      let formData = new FormData();
      formData.append('Billnumber', this.state.txtBillNumber);
      formData.append('Customerid', this.state.customerid);
      formData.append('Paidamount', this.state.txtPay);
      formData.append('Paymentmode', this.state.paymentMode);

      axios
        .post(`https://localhost:44348/api/manage/storepayment`, formData)
        .then((res) => {
          alert('Transaction Completed!!');
        })
        .catch((err) => {
          console.log(err);
          alert('Error Occured!');
        });
    };

    return (
      <div className="div-PaymentPage">
        <div>
          <label for="txtBillNumber">Enter Bill Number</label>
          <input type="text" name="txtBillNumber" value={this.state.txtBillNumber} onChange={handleTextBoxChange} />
          <input type="button" value="Get" onClick={buttonGetBillData} />
        </div>
        <div className="div-bill-cust-details">
          <div>
            <label>Customer Name:</label>
            <label>{this.state.customerName}</label>
          </div>
          <div>
            <label>MobileNumber:</label>
            <label>{this.state.customerMobile}</label>
          </div>
          <div>
            <label>Needs to Pay:</label>
            <label>{this.state.customerBillAmount}</label>
          </div>
        </div>
        <div className="div-thirdsection">
          <div>
            <label>Payment-Mode:</label>
            <select onChange={handleSelectChange}>
              <option value="1">Cash</option>
              <option value="2">Account-Debit</option>
            </select>
          </div>
          <div>
            <label>Pay:</label>
            <input
              type="text"
              name="txtPay"
              value={this.state.txtPay}
              style={{ marginTop: '20px' }}
              onChange={handleTextBoxChange}
            />
          </div>
          <div>
            <input
              type="button"
              value="store"
              style={{ marginTop: '20px', marginLeft: '150px', width: '150px' }}
              onClick={buttonStoreData}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentPage;
