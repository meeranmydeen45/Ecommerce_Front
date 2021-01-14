import React from 'react';

const Modal = (props) => {
  let productsList = '';
  let { data, updateValueToMain } = props;

  const closeModal = (e) => {
    var modal = document.getElementById('modalBackground');
    modal.style.display = 'none';
  };

  const tableSelect = (e, prodName) => {
    var modal = document.getElementById('modalBackground');
    modal.style.display = 'none';
    updateValueToMain(prodName);
  };

  if (data.length > 0) {
    productsList = data.map((item, i) => {
      return (
        <tr id={i}>
          <td>
            <input
              type="button"
              value="Select"
              onClick={(e) => {
                tableSelect(e, item.productName);
              }}
            />
          </td>
          <td>{item.productName}</td>
        </tr>
      );
    });
  }

  return (
    <div id="modalBackground">
      <div id="myModal">
        <div id="divModalClose">
          <span onClick={closeModal}>&times;</span>
        </div>
        <div id="divModalHeader">
          <input type="text" id="searchTextBox" placeholder="TypeHere" />
          <input type="button" value="Search" />
        </div>
        <div id="divModalBody">
          <table id="tableProductModal">
            <thead>
              <tr>
                <th></th>
                <th>ProductName</th>
              </tr>
            </thead>
            <tbody>{productsList}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Modal;
