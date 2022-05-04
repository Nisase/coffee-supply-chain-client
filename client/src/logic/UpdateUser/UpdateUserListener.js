import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import supplychainUserABI from '../../contracts/SupplyChainUser.json';

const SupplyChainUserAddress = '0x8c3ADb90d52223eAf8C5BeD5a6D44da08d4b0BaE';

const UpdateUserListener = () => {
  const [userUpdated, setUserUpdated] = useState([]);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const erc20 = new ethers.Contract(SupplyChainUserAddress, supplychainUserABI.abi, signer);
    erc20.on('UserUpdate', (user, name, email, role, isActive, profileHash) => {
      console.log('EVENTO: ');
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
};

export default UpdateUserListener;
