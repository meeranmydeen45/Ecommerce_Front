import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';

export const setUserSession = (token, userObject) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('userObject', JSON.stringify(userObject));
};

export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('userObject');
};

export const getUser = () => {
  const userObj = sessionStorage.getItem('userObject');
  if (userObj) return JSON.parse(userObj);
  else return null;
};

export const getToken = () => {
  const token = sessionStorage.getItem('token');
  if (token) return token;
  else return null;
};

export const designPDFwithData = (data) => {
  const div = document.createElement('div');
  div.setAttribute('id', 'divTest');
  div.setAttribute('class', 'dynamicDiv');
  div.innerHTML = 'Printable Element';
  return div;
};

export const generatePDFandByteArray = (d) => {
  var container = document.getElementById('printAreaH');
  console.log(container);

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
