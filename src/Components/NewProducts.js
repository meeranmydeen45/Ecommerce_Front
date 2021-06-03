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
      <div className="form-group">
        <label>Select Category</label>
        <SelectField data={dataList} onChange={handleSelect} />
      </div>
      <div className="form-group">
        <label>New Product</label>
        <input type="text" value={txtBoxValue} onChange={handleTextBox} className="form-control" />
      </div>
      <div>
        <input type="file" onChange={handleImageChange} />
      </div>
      <div className="div-preview-img">
        <img src={previewImage} alt="ProdutImage" />
      </div>
      <input
        type="button"
        value="Save"
        onClick={handleSaveClick}
        className="btn btn-primary"
        style={{ padding: '5px 30px' }}
      />
    </div>
  );
}

export default NewProducts;
