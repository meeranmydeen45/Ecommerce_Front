export const setUserSession = (token, userObject) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('userObject', JSON.stringify(userObject));
};

export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('userObject');
};

export const getUser = () => {
  const userObj = sessionStorage.getItem('userObject');
  if (userObj) return JSON.parse(userObj);
  else return null;
};

export const getToken = () => {
  const token = sessionStorage.getItem('token');
  if (token) return token;
  else return null;
};
