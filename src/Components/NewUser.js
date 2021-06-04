import React from 'react';
import useTextBoxControl from '../shared/utils/useTexBoxControl';
import { newUserRegistration } from '../shared/utils/apicalls';

const NewUser = () => {
  const userName = useTextBoxControl('');
  const password = useTextBoxControl('');
  const reTypePassword = useTextBoxControl('');

  const handleClick = () => {
    if ((userName.value != null) & (password.value != null)) {
      if (password.value.trim() == reTypePassword.value.trim()) {
        const promise = newUserRegistration(userName.value, password.value);
        promise.then((res) => {
          alert(res.data);
        });
      } else {
        alert('Password Mismatch!!');
      }
    } else {
      alert('Please Check!!');
    }
  };

  return (
    <div className="LoginContainer">
      <div className="div-LoginInner">
        <h4 style={{ textAlign: 'center', marginBottom: '30px' }}>New User Register</h4>
        <div className="form-group">
          <label>UserName</label>
          <input type="text" {...userName} style={{ marginBottom: '10px' }} className="form-control" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" {...password} style={{ marginBottom: '20px' }} className="form-control" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            {...reTypePassword}
            style={{ marginBottom: '20px' }}
            className="form-control"
            placeholder="Re-Enter"
          />
        </div>
        <div>
          <input
            type="button"
            value="REGISTER"
            onClick={handleClick}
            className="btnget btn btn-primary"
            style={{ marginTop: '15px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default NewUser;
