import React, { useState } from 'react';
import axios from 'axios';

function NewCategory() {
  const [categoryName, setCategory] = useState('');

  const handleTextBoxChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('CategoryName', categoryName);

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
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <h4>Register Your New Category</h4>
        </div>
        <div className="form-group" style={{ marginTop: '50px' }}>
          <label for="name">Catergory Name</label>
          <input
            type="text"
            onChange={handleTextBoxChange}
            className="textBoxNewRegister"
            className="form-control"
            placeholder="Enter Category.."
          />
        </div>
        <input
          type="submit"
          value="Save"
          className="buttonNewRegister"
          className="btn btn-primary"
          style={{ padding: '5px 50px', marginTop: '30px' }}
        />
      </div>
    </form>
  );
}

export default NewCategory;
