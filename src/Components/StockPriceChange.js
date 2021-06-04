import React from 'react';
import axios from 'axios';
import Modal from './Modal';
import { getProductsforModal } from '../shared/utils/apicalls';
import $, { data } from 'jquery';

class StockPriceChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryValue: '',
      productName: '',
      productSize: '',
      optionList: '',
      modalData: '',
      availableQuantity: '',
      currentPrice: '',
      newPrice: '',
      isValidate: false,
    };
  }

  componentDidMount() {
    axios
      .get(`https://localhost:44348/api/home/getcategory`)
      .then((res) => {
        let categoryList = res.data;
        const options = categoryList.map((item, i) => {
          return <option value={item.id}>{item.categoryName}</option>;
        });
        this.setState({ optionList: options });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const handleDropDownChange = (e) => {
      this.setState({ categoryValue: e.target.value });
    };

    const handleTextBoxChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };

    const handleModel = (e) => {
      let promise = getProductsforModal(this.state.categoryValue);
      promise.then((res) => {
        this.setState({ modalData: res.data });
      });
      var modal = document.getElementById('modalBackground');
      modal.style.display = 'block';
    };

    const updateValueFromModal = (productName, imagePath) => {
      this.setState({ productName: productName, imagePathName: imagePath });
      const formData = new FormData();
      formData.append('ProductName', productName);
      formData.append('ProductSize', this.state.productSize);
      formData.append('CategoryId', this.state.categoryValue);
      axios
        .post(`https://localhost:44348/api/Manage/getstockprice`, formData)
        .then((res) => {
          if (typeof res.data === 'object') {
            this.setState({ isValidate: true, availableQuantity: res.data.quantity, currentPrice: res.data.cost });
          } else {
            this.setState({ isValidate: false });
          }
        })
        .catch((error) => {
          this.setState({ isValidate: false });
          console.log(error);
        });
    };

    const handleStoreClick = () => {
      const formData = new FormData();
      formData.append('ProductName', this.state.productName);
      formData.append('ProductSize', this.state.productSize);
      formData.append('CategoryId', this.state.categoryValue);
      formData.append('Cost', this.state.newPrice);
      axios
        .post(`https://localhost:44348/api/Manage/setstockprice`, formData)
        .then((res) => {
          alert(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return (
      <div className="div-EditStockPrice">
        <h4 style={{ textAlign: 'center', marginBottom: '30px' }}>Change Stock Price</h4>
        <div className="form-group">
          <select onChange={handleDropDownChange} id="selectCategory" className="form-control">
            <option value="default">Choose Option</option>
            {this.state.optionList}
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={handleTextBoxChange}
            name="productSize"
            value={this.state.productSize}
            placeholder="Size"
          />
        </div>
        <div className="input-group form-group">
          <input
            type="text"
            className="form-control"
            onChange={handleTextBoxChange}
            name="productName"
            value={this.state.productName}
            placeholder="Choose prod name."
          />
          <div className="input-group-append">
            <input type="button" value="--" onClick={handleModel} className="btn btn-info" />
          </div>
        </div>

        <Modal data={this.state.modalData} updateValueToMain={updateValueFromModal}></Modal>
        {this.state.isValidate === true ? (
          <div>
            <div className="form-group">
              <label>
                Available Quantity
                <span style={{ marginLeft: '10px' }}>
                  <b style={{ color: 'blue' }}>{this.state.availableQuantity}</b>
                </span>
              </label>
            </div>
            <div className="form-group">
              <label>
                Current Price
                <span id="DynamicLabel">
                  <b style={{ color: 'blue' }}>{this.state.currentPrice}</b>
                </span>
              </label>
            </div>
          </div>
        ) : (
          ''
        )}

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={handleTextBoxChange}
            name="newPrice"
            value={this.state.newPrice}
            placeholder="Enter New Price"
          />
        </div>
        <input type="button" value="Store" onClick={handleStoreClick} className="getbtn btn btn-primary" />
      </div>
    );
  }
}

export default StockPriceChange;
