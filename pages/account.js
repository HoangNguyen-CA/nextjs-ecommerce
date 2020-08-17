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
  return (
    <div>
      {' '}
      <h1 className='mb-4' style={{ textAlign: 'center' }}>
        Account
      </h1>
      {content}
    </div>
  );
};

export default Account;
