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
      <label>Type Size in Caps-Lock: </label>
      <input type="text" {...size} />
      <input type="button" value="Add" onClick={handleAddClick} />
    </div>
  );
}

export default SizesAddPage;
