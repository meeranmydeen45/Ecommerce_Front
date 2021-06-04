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
      <div className="div-LoginInner">
        <h4 style={{ textAlign: 'center', marginBottom: '30px' }}>Login Page</h4>
        <div className="form-group">
          <label>UserName</label>
          <input type="text" {...userName} className="form-control" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" {...password} className="form-control" />
        </div>
        <div>
          <input
            type="button"
            value="Login"
            onClick={handleClick}
            className="getbtn btn btn-primary"
            style={{ marginTop: '15px' }}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
