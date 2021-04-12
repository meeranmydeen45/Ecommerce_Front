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

export const designPDFwithData = async (data) => {
  //Parent Div of all Content in PrintPage
  const div = document.createElement('div');
  div.setAttribute('id', 'divParent');
  div.setAttribute('class', 'dynamicDiv');
  div.innerHTML = '-';

  //Start  - Div for Header:Shop Name and address
  const divHeader = document.createElement('div');
  divHeader.setAttribute('class', 'content-head');
  const h3 = document.createElement('h3');
  h3.innerHTML = 'Freezing Blue Sky';
  divHeader.appendChild(h3);
  const p1 = document.createElement('p');
  p1.innerHTML = '#101, Oak Street, Paris, France';
  divHeader.appendChild(p1);
  const p2 = document.createElement('p');
  p2.innerHTML = '04-225687';
  divHeader.appendChild(p2);
  div.appendChild(divHeader);
  //#endregion Div Header Section

  //starts - Div Table Section
  const divTable = document.createElement('div');
  divTable.setAttribute('id', 'divTable');
  const table = document.createElement('table');
  var props = [];
  for (var propName in data.custwithorder.cartItems[0]) {
    props.push(propName);
  }

  for (var i = 0; i < data.custwithorder.cartItems.length; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < props.length; j++) {
      var td = document.createElement('td');

      var textNode = document.createTextNode(data.custwithorder.cartItems[i][props[j]]);

      td.appendChild(textNode);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  console.log(table);
  divTable.appendChild(table);
  div.appendChild(divTable);
  //#endregion of Table Section
  console.log(div);
  return await div;
};

export const generatePDFandByteArray = (dynamicDiv) => {
  var container = document.getElementById('printAreaH');

  container.appendChild(dynamicDiv);
  console.log(container);
  //debugger;
  html2canvas(container).then((canvas) => {
    //container.innerHTML = '';
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
