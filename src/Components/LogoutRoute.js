import React from 'react';
import { Route } from 'react-router-dom';

const LogoutRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => <Component {...props} updateNavState={rest} />} />;
};

export default LogoutRoute;
