import React from 'react';
import axios from 'axios';
import { GetCustomerAccountDetails } from '../shared/utils/apicalls';

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
      paymentMode: 'CASH',
      availableAccountBalance: '',
      isValid: false,
    };
  }
  render() {
    const handleTextBoxChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e) => {
      this.setState({ paymentMode: e.target.value });
    };
    // Select Handling Issue in PaymentMode - Because of that function written outside instead of Select Hanlding
    const getAvailableBalance = () => {
      if (this.state.isValid) {
        if (this.state.paymentMode === 'ACCOUNT' && this.state.availableAccountBalance === '') {
          let promiseCustAccount = GetCustomerAccountDetails(this.state.customerid);
          promiseCustAccount
            .then((res) => {
              let data = res.data;
              this.setState({ availableAccountBalance: data.availableamount });
            })
            .catch((err) => {
              console.log(err);
              alert(`Error Occured whilte fetchinig Account Details of Mr.${this.state.customerName}`);
            });
        } else if (this.state.paymentMode === 'CASH' && this.state.availableAccountBalance !== '') {
          this.setState({ availableAccountBalance: '' });
        }
      }
    };
    getAvailableBalance();

    const buttonGetBillData = () => {
      if (!isNaN(this.state.txtBillNumber)) {
        let formData = new FormData();
        formData.append('Billnumber', this.state.txtBillNumber);
        axios.post(`https://localhost:44348/api/manage/getbilldata`, formData).then((res) => {
          let data = res.data;
          if (data.customer !== null) {
            this.setState({
              customerid: data.customer.customerId,
              customerName: data.customer.customerName,
              customerMobile: data.customer.customermobile,
              customerBillAmount: data.totalcost,
              isValid: true,
            });
          } else {
            alert('Incorrect Bill Number');
            this.setState({
              customerid: '',
              customerName: '',
              customerMobile: '',
              customerBillAmount: '',
              isValid: false,
            });
          }
        });
      } else {
        alert('Enter Number Values only!');
        this.setState({ isValid: false });
      }
    };
    const buttonMakePayment = () => {
      let formData = new FormData();
      formData.append('Billnumber', this.state.txtBillNumber);
      formData.append('Customerid', this.state.customerid);
      formData.append('Paidamount', this.state.txtPay);
      formData.append('Paymentmode', this.state.paymentMode);

      axios
        .post(`https://localhost:44348/api/manage/storepayment`, formData)
        .then((res) => {
          alert('Transaction Completed!!');
          this.setState({
            txtBillNumber: '',
            customerName: '',
            customerMobile: '',
            customerBillAmount: '',
            isValid: false,
            txtPay: '',
            availableAccountBalance: '',
            paymentMode: '',
          });
        })
        .catch((err) => {
          console.log(err);
          alert('Error Occured!');
        });
    };

    return (
      <div className="div-PaymentPage">
        <h4 style={{ textAlign: 'center' }}>PAYMENT SECTION</h4>
        <div className="form-group" style={{ marginTop: '50px' }}>
          <input
            type="text"
            className="form-control"
            name="txtBillNumber"
            placeholder="Enter Bill No.."
            value={this.state.txtBillNumber}
            onChange={handleTextBoxChange}
          />
          <input type="button" value="Get-Bill" onClick={buttonGetBillData} className="getbtn btn btn-primary" />
        </div>
        {this.state.isValid === true ? (
          <div className="div-bill-cust-details">
            <div className="form-group">
              <label>Customer Name</label>
              <label>{this.state.customerName}</label>
            </div>
            <div className="form-group">
              <label>MobileNumber</label>
              <label>{this.state.customerMobile}</label>
            </div>
            <div className="form-group">
              <label>Needs to Pay</label>
              <label>{this.state.customerBillAmount}</label>
            </div>
          </div>
        ) : (
          ''
        )}

        <div className="div-thirdsection">
          <div className="form-group">
            <label>Payment-Mode</label>
            <select onChange={handleSelectChange} className="form-control">
              <option value="CASH">Cash</option>
              <option value="ACCOUNT">Account-Debit</option>
            </select>
          </div>
          <div>
            <label>{this.state.availableAccountBalance !== '' ? 'Account Balance' : ''}</label>
            <label style={{ fontWeight: 'bold', color: 'blue' }}>{this.state.availableAccountBalance}</label>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Pay Amount.."
              name="txtPay"
              value={this.state.txtPay}
              style={{ marginTop: '20px' }}
              onChange={handleTextBoxChange}
            />
          </div>
          <div>
            <input
              type="button"
              value="Pay"
              style={{ marginTop: '20px', padding: '6px 60px' }}
              onClick={buttonMakePayment}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentPage;
