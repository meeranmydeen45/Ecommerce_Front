import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getToken } from '../shared/utils/helper';

const UserRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (!getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/order' }} />)}
    />
  );
};

export default UserRoute;
