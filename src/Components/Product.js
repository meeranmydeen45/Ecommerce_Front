import React from 'react';
import { connect } from 'react-redux';
import { fetchData, changeSizeIndex } from '../Redux/Actions/ProductAction';
import { addToCart } from '../Redux/Actions/CartAction';
import { NavLink } from 'react-router-dom';
import { getProductsList } from '../Redux/asyncActions/productAsync';

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      sizeIndexArray: null,
    };
  }

  componentDidMount() {
    this.props.getProductsList();
  }

  render() {
    const { items, cartItems, indexArray, changeSizeIndex } = this.props;
    let totalProducts = cartItems.reduce((sum, item) => sum + item.Quantity, 0);
    const baseUrl = 'https://localhost:44348/Images/';

    const handleDropDownChange = (e) => {
      const arrayValue = e.target.value.split('-');
      const sizeIndex = arrayValue[0];
      const productId = arrayValue[1];

      changeSizeIndex(productId, sizeIndex, indexArray);
    };

    const productList = items.map((item, i) => {
      return (
        <div className="cardAlignment">
          <div className="card" key={i}>
            <div className="card-header">
              <div className="card-title">{item.productName}</div>
            </div>
            <div className="card-body">
              <img src={baseUrl + '/' + item.productImage} alt="NotFound" style={{ width: '200px', height: '100px' }} />
              <select onChange={handleDropDownChange}>
                {item.listOfstocksBySize.map((sizeitem, index) => {
                  return <option value={index + '-' + sizeitem.productId}>{sizeitem.size}</option>;
                })}
              </select>
              <div>Quantity: {item.listOfstocksBySize[indexArray[item.id - 1].SizeIndex].quantity}</div>
            </div>
            <div className="card-footer">
              Cost ${item.listOfstocksBySize[indexArray[item.id - 1].SizeIndex].cost}
              <button className="btn btn-primary" onClick={() => this.props.addToCart(item, indexArray, cartItems)}>
                Add
              </button>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="div-Product">
        <div
          style={{
            position: 'absolute',
            textAlign: 'center',
            color: 'gold',
            fontWeight: 'bold',
            top: '-40px',
            right: '-350px',
          }}
        >
          <NavLink to="/cardList" className="btn btn-secondary">
            <span class="fa fa-shopping-cart">{totalProducts}</span>
          </NavLink>
        </div>

        {productList}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.Products.items,
    indexArray: state.Products.indexArray,
    cartItems: state.CartItems.items,
  };
};

const mapDispatchToProps = {
  fetchData,
  addToCart,
  getProductsList,
  changeSizeIndex,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
