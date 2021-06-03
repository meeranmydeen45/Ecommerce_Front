import React from 'react';
import useTextBoxControl from '../shared/utils/useTexBoxControl';
import { AddingSizeInDB } from '../shared/utils/apicalls';

function SizesAddPage() {
  const size = useTextBoxControl('');
  const handleAddClick = () => {
    if (size.value != null) {
      const promise = AddingSizeInDB(size.value);
      promise
        .then((res) => {
          alert(res.data);
        })
        .catch((err) => {
          alert('Error Occured while Adding Sizes');
        });
    } else {
      alert('Please Enter Valid Data');
    }
  };
  return (
    <div className="div-Adding-Size">
      <div className="form-group">
        <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>Entry for Product Size</h4>
        <label for="Size">Enter Size</label>
        <input type="text" {...size} placeholder="Type here.." className="form-control" name="Size" />
      </div>
      <input type="button" value="Add" onClick={handleAddClick} className="getbtn btn btn-primary" />
    </div>
  );
}

export default SizesAddPage;
