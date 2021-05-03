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
          console.log(res.data.cost);
          this.setState({ availableQuantity: res.data.quantity, currentPrice: res.data.cost });
        })
        .catch((error) => {
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
      <div className="Container-StockPriceChange">
        <label>Select Category</label>

        <select onChange={handleDropDownChange} id="selectCategory">
          <option value="default">Choose Option</option>
          {this.state.optionList}
        </select>

        <label>ProductSize</label>

        <input type="text" onChange={handleTextBoxChange} name="productSize" value={this.state.productSize} />

        <label>ProductName</label>

        <input type="text" onChange={handleTextBoxChange} name="productName" value={this.state.productName} />

        <input type="button" value="--" onClick={handleModel} />

        <Modal data={this.state.modalData} updateValueToMain={updateValueFromModal}></Modal>

        <label>Available Quantity: {this.state.availableQuantity}</label>
        <label>Current Price: {this.state.currentPrice}</label>
        <label>Entre New Price</label>
        <input type="text" onChange={handleTextBoxChange} name="newPrice" value={this.state.newPrice} />

        <input type="button" value="Store" onClick={handleStoreClick} />
      </div>
    );
  }
}

export default StockPriceChange;
