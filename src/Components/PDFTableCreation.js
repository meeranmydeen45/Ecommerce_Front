import React from 'react';
import { jsPDFTableCreation } from '../shared/utils/helper';

function PDFTableCreation() {
  const handleTestClick = () => {
    var header = ['ID', 'Name', 'Address', 'Age'];
    var rows = [
      [1, 'John', 'Vilnius', 45],
      [2, 'Jack', 'Riga', 25],
      [2, 'Jack', 'Riga', 25],
      [2, 'Jack', 'Riga', 25],
      [2, 'Jack', 'Riga', 25],
      [1, 'John', 'Vilnius', 45],
    ];

    jsPDFTableCreation(header, rows);
  };

  return (
    <div className="div-PDFTableCreation">
      <h1>Click to Generate Test PDF table</h1>
      <input type="button" value="TestPDF" onClick={handleTestClick} />
    </div>
  );
}

export default PDFTableCreation;
