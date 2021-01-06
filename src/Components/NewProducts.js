import React from 'react';

function NewProducts() {
  return (
    <div className="newProducts">
      <div className="newProducts-Inner">
        <div style={{ textAlign: 'center' }}>
          <b>Register Your New Products</b>
        </div>
        <input type="text" className="textBoxNewRegister" />
        <input type="button" value="Save" className="buttonNewRegister" />
        <input type="button" value="Show" className="buttonNewRegister" />
      </div>
    </div>
  );
}

export default NewProducts;
