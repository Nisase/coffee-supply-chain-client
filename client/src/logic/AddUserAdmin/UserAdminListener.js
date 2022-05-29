import { useState, useEffect } from 'react';
import { getUserERC20 } from '../erc20';

const UserAdminListener = () => {
  const [ userRegistered, setUserRegistered ] = useState({});
  
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
    const erc20 = getUserERC20();
    erc20.on('UserUpdate', (user, name, email, role, isActive, profileHash, event) => {
      setUserRegistered({
          user,
          name,
          email,
          role,
          isActive,
          profileHash,
          tx: event.transactionHash
        })
      }
    )
    return () => {
      erc20.removeAllListeners('UserUpdate');
    }}
  }, []);

  return {userRegistered};
};

export default UserAdminListener;
