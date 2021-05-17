import React from 'react';
import axios from 'axios';
import Modal from './Modal';
import { getProductsforModal } from '../shared/utils/apicalls';

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
      var modal = document.getElementById('modalBackground');
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

      console.log(this.state.categoryValue);

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
        <div id="divHead">Product Entry</div>

        <div id="divBody">
          <div id="left-Section">
            <form onSubmit={handleFormSumbit}>
              <div id="div4">
                <div id="div4-1">
                  <label>Select Category</label>
                </div>
                <div id="div4-2">
                  <select onChange={handleDropDownChange} id="selectCategory">
                    <option value="default">Choose Option</option>
                    {this.state.optionList}
                  </select>
                </div>
                <div id="div4-3"></div>
                <div id="div4-4"></div>
              </div>

              <div id="div4">
                <div id="div4-1">
                  <label>ProductName</label>
                </div>
                <div id="div4-2">
                  <input type="text" onChange={handleTextBoxChange} name="productName" value={this.state.productName} />
                </div>
                <div id="div4-3" style={{ textAlign: 'left' }}>
                  <input type="button" value="--" onClick={handleModel} />
                </div>
                <div id="div4-4"></div>
              </div>

              <div id="div4">
                <div id="div4-1">
                  <label>ProductSize</label>
                </div>
                <div id="div4-2">
                  <input type="text" onChange={handleTextBoxChange} name="productSize" />
                </div>
                <div id="div4-3" style={{ textAlign: 'left' }}>
                  <input type="button" value="--" />
                </div>
                <div id="div4-4"></div>
              </div>

              <div id="div4">
                <div id="div4-1">
                  <label>UnitPrice</label>
                </div>
                <div id="div4-2">
                  <input type="text" onChange={handleTextBoxChange} name="productPrize" />
                </div>
                <div id="div4-3"></div>
                <div id="div4-4"></div>
              </div>

              <div id="div4">
                <div id="div4-1">
                  <label>TotalNumbers</label>
                </div>
                <div id="div4-2">
                  <input type="text" onChange={handleTextBoxChange} name="productQuantity" />
                </div>
                <div id="div4-3">
                  <label>TotalCost</label>
                </div>
                <div id="div4-4">
                  <label>INR {this.state.productQuantity * this.state.productPrize}</label>
                </div>
              </div>

              <div id="div4">
                <div id="div4-1">
                  <label>EXTRAS</label>
                </div>
                <div id="div4-2">FILE UPLOAD REMOVED</div>
                <div id="div4-3"></div>
                <div id="div4-4"></div>
              </div>

              <div>
                <input type="submit" value="Store" className="btn btn-primary" />
              </div>
            </form>
          </div>

          <div id="right-Section">
            <label htmlFor="previewImage">PreviewImage of Uploaded File</label>
            <img src={baseUrl + '/' + this.state.imagePathName} alt="" style={{ height: '300px' }} />
          </div>
          <Modal data={this.state.modalData} updateValueToMain={updateValueFromModal}></Modal>
        </div>
      </div>
    );
  }
}

export default ProductEntry;
