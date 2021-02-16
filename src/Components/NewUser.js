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
      <div className="divBorder">
        <label>
          <b>UserName</b>
        </label>
        <input type="text" {...userName} style={{ marginBottom: '10px' }} />
        <label>
          <b>Password</b>
        </label>
        <input type="text" {...password} style={{ marginBottom: '20px' }} />
        <label>
          <b>ReType-Password</b>
        </label>
        <input type="text" {...reTypePassword} style={{ marginBottom: '20px' }} />
        <input type="button" value="Register" onClick={handleClick} />
      </div>
    </div>
  );
};

export default NewUser;
