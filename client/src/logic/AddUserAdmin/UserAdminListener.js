import { useState, useEffect } from 'react';
import { getUserERC20 } from '../erc20';

const UserAdminListener = () => {
  const [ userRegistered, setUserRegistered ] = useState({});

  useEffect(() => {
    const erc20 = getUserERC20();
    erc20.on('UserUpdate', (user, name, email, role, isActive, profileHash) => {
      setUserRegistered(
        {
          user,
          name,
          email,
          role,
          isActive,
          profileHash,
        }
      );
    });
    return () => {
      erc20.removeAllListeners('UserUpdate');
    };
  }, []);

  return {userRegistered};
};

export default UserAdminListener;
