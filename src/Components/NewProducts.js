import React, { useState, useEffect } from 'react';
import { getCategoryList, handleSaveNewProduct } from '../shared/utils/apicalls';
import SelectField from '../atoms/Select/index';

function NewProducts() {
  const [dataList, setDataList] = useState([]);
  const [selectValue, setSelectValue] = useState('');
  const [txtBoxValue, setTxtBoxValue] = useState('');
  const [imageFile, setImage] = useState(undefined);
  const [previousImage, setPreviousImage] = useState('');
  const [previewImage, setPreviewImage] = useState(undefined);

  let isData = false;
  let isImage = false;
  let idWithName = {};

  useEffect(() => {
    const fetchData = () => {
      try {
        const promise = getCategoryList();
        promise.then((res) => {
          setDataList(res.data);
        });
      } catch {}
    };
    fetchData();
    return () => {
      isData = true;
    };
  }, []);

  useEffect(() => {
    if (!imageFile) {
      return;
    }
    const imageUrl = URL.createObjectURL(imageFile);
    if (previousImage !== imageFile) {
      setPreviewImage(imageUrl);
      setPreviousImage(imageFile);
    }
  }, [imageFile]);

  const handleSaveClick = () => {
    let promise = handleSaveNewProduct(idWithName, imageFile);
    promise.then((res) => {
      alert(res.data);
    });
  };

  const handleSelect = (e) => {
    setSelectValue(e.target.value);
  };

  const handleTextBox = (e) => {
    setTxtBoxValue(e.target.value);
  };
  idWithName.id = selectValue;
  idWithName.name = txtBoxValue;

  const handleImageChange = (e) => {
    if (!e.target.files && e.target.files.length === 0) {
      setImage(undefined);
      return;
    }
    setPreviousImage(imageFile);
    setImage(e.target.files[0]);
  };

  return (
    <div className="newProducts">
      <div className="newProducts-Inner">
        <div>
          <b>Select Category</b>
          <SelectField data={dataList} onChange={handleSelect} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <b>Register Your New Products</b>
        </div>
        <input type="text" value={txtBoxValue} onChange={handleTextBox} />
        <div>
          <input type="file" onChange={handleImageChange} />
        </div>
        <div>
          <img src={previewImage} alt="" style={{ width: '100px' }} />
        </div>
        <input type="button" value="Save" onClick={handleSaveClick} className="buttonNewRegister" />
        <input type="button" value="Show" className="buttonNewRegister" />
      </div>
    </div>
  );
}

export default NewProducts;
