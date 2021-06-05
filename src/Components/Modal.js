import React from 'react';

const Modal = (props) => {
  var modal = document.getElementById('myModal');
  let productsList = '';
  const baseUrl = 'https://localhost:44348/Images/';
  let { data, updateValueToMain } = props;

  const tableSelect = (e, prodName, imagePath) => {
    modal.style.display = 'none';
    updateValueToMain(prodName, imagePath);
  };

  if (data.length > 0) {
    productsList = data.map((item, i) => {
      return (
        <tr id={i}>
          <td>
            <input
              type="button"
              value="SELECT"
              className="btn btn-outline-primary"
              style={{ padding: '0 5px', fontSize: '12px' }}
              onClick={(e) => {
                tableSelect(e, item.productName, item.imagePath);
              }}
            />
          </td>
          <td>{item.productName}</td>
          <td>
            <img
              src={baseUrl + '/' + item.imagePath}
              alt="NotAvailable"
              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
            />
          </td>
        </tr>
      );
    });
  }

  const modalClose = () => {
    modal.style.display = 'none';
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
  return (
    <div className="modal" id="myModal">
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={modalClose}>
            &times;
          </span>
        </div>
        <div className="modal-body table-responsive">
          <table className="table-hover">
            <thead>
              <tr>
                <th></th>
                <th>Prod Name</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>{productsList}</tbody>
          </table>
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  );
};

export default Modal;
