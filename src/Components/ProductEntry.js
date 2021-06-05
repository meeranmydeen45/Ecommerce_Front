import React from 'react';
import axios from 'axios';
import Modal from './Modal';
import { getProductsforModal } from '../shared/utils/apicalls';
import { modalHandling } from '../shared/utils/helper';
import $ from 'jquery';

class ProductEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePathName: null,
      categoryValue: '',
      productName: '',
      productSize: '',
      productQuantity: '',
      productPrize: '',
      optionList: '',
      modalData: '',
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

  // componentDidUpdate() {
  //   if (!this.state.ImageFile) {
  //     //this.setState({previewImage: undefined})
  //     return;
  //   }
  //   const imageUrl = URL.createObjectURL(this.state.ImageFile);
  //   if (this.state.previousFile !== this.state.ImageFile) {
  //     this.setState({ previewImage: imageUrl, previousFile: this.state.ImageFile });
  //   }
  // }

  render() {
    const baseUrl = 'https://localhost:44348/Images/';

    const handleDropDownChange = (e) => {
      this.setState({ categoryValue: e.target.value });
    };

    const handleTextBoxChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };

    // const handleImageChange = (e) => {
    //   if (!e.target.files && e.target.files.length === 0) {
    //     this.setState({ ImageFile: undefined });
    //     return;
    //   }
    //   this.setState({ previousFile: this.state.ImageFile });
    //   this.setState({ ImageFile: e.target.files[0] });
    // };

    const handleModel = (e) => {
      let promise = getProductsforModal(this.state.categoryValue);
      promise.then((res) => {
        this.setState({ modalData: res.data });
      });

      var modal = document.getElementById('myModal');
      modal.style.display = 'block';
    };

    const updateValueFromModal = (productName, imagePath) => {
      this.setState({ productName: productName, imagePathName: imagePath });
    };

    const handleFormSumbit = (e) => {
      e.preventDefault();
      const formData = new FormData();

      formData.append('Catergory', this.state.categoryValue);
      formData.append('Name', this.state.productName);
      formData.append('Size', this.state.productSize);
      formData.append('Quantity', this.state.productQuantity);
      formData.append('Cost', this.state.productPrize);

      axios
        .post(`https://localhost:44348/api/home/register`, formData)
        .then((res) => {
          alert(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return (
      <div className="productEntryComponent">
        <h4 style={{ textAlign: 'center', marginBottom: '30px' }}>Product Purchase Entry Section</h4>
        <div className="entry-full-section">
          <div className="entry-left-section">
            <form onSubmit={handleFormSumbit}>
              <div className="row form-group">
                <div className="col-3 mt-2">
                  <label>Select Category</label>
                </div>
                <div className="col-6">
                  <select onChange={handleDropDownChange} id="selectCategory" className="form-control">
                    <option value="default">Choose Option</option>
                    {this.state.optionList}
                  </select>
                </div>
              </div>
              <div className="row form-group">
                <div className="col-3 mt-2">
                  <label>Product Name</label>
                </div>
                <div className="col-6 input-group">
                  <input
                    type="text"
                    onChange={handleTextBoxChange}
                    name="productName"
                    value={this.state.productName}
                    className="form-control"
                  />
                  <div className="input-group-append">
                    <input
                      type="button"
                      value="--"
                      onClick={handleModel}
                      className="btn btn-info"
                      style={{ maxHeight: '40px' }}
                    />
                  </div>
                </div>
              </div>
              <div className="row form-group">
                <div className="col-3 mt-2">
                  <label>Product Size</label>
                </div>
                <div className="col-6 input-group">
                  <input type="text" onChange={handleTextBoxChange} name="productSize" className="form-control" />
                  <div className="input-group-append">
                    <input type="button" value="--" className="btn btn-info" style={{ maxHeight: '40px' }} />
                  </div>
                </div>
              </div>
              <div className="row form-group">
                <div className="col-3 mt-2">
                  <label>Unit Price</label>
                </div>
                <div className="col-6">
                  <input type="text" onChange={handleTextBoxChange} name="productPrize" className="form-control" />
                </div>
              </div>
              <div className="row form-group">
                <div className="col-3 mt-2">
                  <label>Total Numbers</label>
                </div>
                <div className="col-6">
                  <input type="text" onChange={handleTextBoxChange} name="productQuantity" className="form-control" />
                </div>
              </div>
              <div className="row form-group">
                <div className="col-3 mt-2">
                  <label>Total Cost</label>
                </div>
                <div className="col-6 mt-2">
                  <p style={{ fontWeight: 'bold', color: 'blue' }}>
                    {this.state.productQuantity * this.state.productPrize} INR
                  </p>
                </div>
              </div>
              <div className="row form-group">
                <div className="col-9">
                  <input type="submit" value="STORE" className="btn btn-outline-primary btn-block" />
                </div>
              </div>
            </form>
          </div>
          <div className="entry-right-section">
            <div>
              <img src={baseUrl + '/' + this.state.imagePathName} alt="Image" />
            </div>
          </div>
        </div>
        <Modal data={this.state.modalData} updateValueToMain={updateValueFromModal}></Modal>
      </div>
    );
  }
}

export default ProductEntry;
