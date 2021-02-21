import React from 'react';
import { removeUserSession } from '../shared/utils/helper';

const Logout = (props) => {
  removeUserSession();
  props.history.push('/');
  props.updateNavState.handleEvents();
  return null;
};

export default Logout;
