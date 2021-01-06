import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { removeCart, cartItemIncrement, cartItemDecrement } from '../Redux/Actions/CartAction';

function CartList({ cartItems, removeCart, cartItemIncrement, cartItemDecrement }) {
  const baseUrl = 'https://localhost:44348/Images/';

  let totalCost = cartItems.reduce((sum, item) => sum + item.cost * item.Quantity, 0);
  let totalProducts = cartItems.reduce((sum, item) => sum + item.Quantity, 0);

  const handleClick = (cartItems) => {
    //  axios.post(`https://localhost:44348/api/home/pruchase`, cartItems).then(res => {
    //      alert("Transaction Completed IN REactjs")

    //  })
    var container = document.getElementById('printArea');
    html2canvas(container).then((canvas) => {
      var img = canvas.toDataURL();
      var doc = new jsPDF();
      doc.addImage(img, 'jpg', 10, 10);

      var byteChar = doc.output();
      var base64 = btoa(byteChar);

      var formData = new FormData();
      formData.append('FileName', 'myPdfFile');
      formData.append('base64', base64);

      var config = {
        header: {
          'Content-Type': 'multipart/formdata',
        },
      };

      axios.post(`https://localhost:44348/api/home/pdfdata`, formData, config).then((res) => {
        alert('Saved Successfully');

        let base64 = res.data;
        base64 = base64.replace(/^[^,]+,/, '');
        base64 = base64.replace(/\s/g, '');
        let byteCharacter = atob(base64);

        let byteNumber = new Array(byteCharacter.length);

        for (var i = 0; i < byteCharacter.length; i++) {
          byteNumber[i] = byteCharacter.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumber);

        var blob = new Blob([byteArray], { type: 'application/pdf;base64' });
        var fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_target');
      });
    });
  };

  const cartList = cartItems.map((item, i) => {
    return (
      <tr key={i}>
        <td>
          {item.productName}{' '}
          <img src={baseUrl + '/' + item.productImage} alt="NA" style={{ width: '50px', height: '50px' }} />
        </td>
        <td>{item.size}</td>
        <td>{item.cost}</td>

        <td>
          <a href="#" onClick={() => cartItemDecrement(item, cartItems)}>
            -
          </a>
          {item.Quantity}
          <a href="#" onClick={() => cartItemIncrement(item, cartItems)}>
            +
          </a>
        </td>

        <td>
          <button className="btn btn-success" onClick={() => removeCart(item, cartItems)}>
            X
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="div-Cart" id="printArea">
      Added Item in Cart {totalProducts}
      <table className="cartTable" id="cartTable">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Size</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>{cartList}</tbody>
      </table>
      Total Cost to Pay {totalCost}
      <input type="button" class="btn btn-info" value="Store" onClick={() => handleClick(cartItems)} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.CartItems.items,
  };
};

const mapDispatchToProps = {
  removeCart,
  cartItemIncrement,
  cartItemDecrement,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
