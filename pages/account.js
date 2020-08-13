import React, { useContext } from 'react';

import { UserContext } from '../components/Context/UserContext';

const Account = () => {
  const user = useContext(UserContext);

  let content = null;
  if (user) {
    content = <p>{user.email}</p>;
  } else {
    content = <p>Not Signed In</p>;
  }
  return <div>{content}</div>;
};

export default Account;
