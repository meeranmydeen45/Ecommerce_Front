import React from 'react';
import axios from 'axios';

function NewCategory() {
  var CategoryName = '';

  const handleTextBoxChange = (e) => {
    CategoryName = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('CategoryName', CategoryName);

    axios
      .post(`https://localhost:44348/api/home/addcategory`, formData)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="newCategory">
        <div className="newCategory-inner">
          <div style={{ textAlign: 'center' }}>
            <b>Register Your New Category</b>
          </div>
          <input type="text" onChange={handleTextBoxChange} className="textBoxNewRegister" />
          <input type="submit" value="Save" className="buttonNewRegister" />
          <input type="button" value="Show" className="buttonNewRegister" />
        </div>
      </div>
    </form>
  );
}

export default NewCategory;
