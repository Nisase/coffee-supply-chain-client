import { useState, useEffect } from 'react';
import { getUserERC20 } from '../erc20';

const UpdateUserListener = () => {
  const [userUpdated, setUserUpdated] = useState([]);

  useEffect(() => {
    const erc20 = getUserERC20();
    erc20.on('UserUpdate', (user, name, email, role, isActive, profileHash) => {
      console.log({ user, name, email, role, isActive, profileHash });
      setUserUpdated((currentData) => [
        ...currentData,
        {
          user,
          name,
          email,
          role,
          isActive,
          profileHash,
        },
      ]);
    });
    return () => {
      erc20.removeAllListeners('UserUpdate');
    };
  }, []);
  return userUpdated;
};

export default UpdateUserListener;
