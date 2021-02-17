import React from 'react';
import { removeUserSession } from '../shared/utils/helper';

const Logout = (props) => {
  removeUserSession();
  props.history.push('/');
  return null;
};

export default Logout;
