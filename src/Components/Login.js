import React from 'react';

function Login() {
  return (
    <div className="LoginContainer">
      <div className="divBorder">
        <label>
          <b>UserName</b>
        </label>
        <input type="text" style={{ marginBottom: '10px' }} />
        <label>
          <b>Password</b>
        </label>
        <input type="password" style={{ marginBottom: '20px' }} />
        <input type="button" value="Login" />
      </div>
    </div>
  );
}

export default Login;
