import React from 'react';
import useTextBoxControl from '../shared/utils/useTexBoxControl';
import { userValidation } from '../shared/utils/apicalls';
import { setUserSession, removeUserSession } from '../shared/utils/helper';

function Login(props) {
  const userName = useTextBoxControl('');
  const password = useTextBoxControl('');

  const handleClick = () => {
    if (userName.value != null && password.value != null) {
      const promise = userValidation(userName.value, password.value);
      promise.then((res) => {
        const userObj = res.data;
        if (userObj.username != null) {
          setUserSession(userObj.password, userObj);
          props.history.push('/order');
          props.updateNavState.handleEvents();
        } else {
          alert(res.data);
        }
      });
    } else {
      alert('Please check your details!!');
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
        <input type="password" {...password} style={{ marginBottom: '20px' }} />
        <input type="button" value="Login" onClick={handleClick} />
      </div>
    </div>
  );
}

export default Login;
