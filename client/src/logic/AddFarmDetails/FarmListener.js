import { useState, useEffect } from 'react';
import { getCoffe1ERC20 } from '../erc20';

const FarmListener = () => {
  const [farmRegistered, setFarmRegistered] = useState({});

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const erc20 = getCoffe1ERC20();
      erc20.on('SetFarmDetails', (user, batchNo, event) => {
        setFarmRegistered({
          user,
          batchNo,
          tx: event.transactionHash,
        });
      });
      return () => {
        erc20.removeAllListeners('SetFarmDetails');
      };
    }
  }, []);
  return { farmRegistered };
};

export default FarmListener;
