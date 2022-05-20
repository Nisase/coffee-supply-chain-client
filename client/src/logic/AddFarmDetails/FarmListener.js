import { useState, useEffect } from 'react';
import { getCoffeERC20 } from '../erc20';

const FarmListener = () => {
  const [farmRegistered, setFarmRegistered] = useState({});

  useEffect(() => {
    const erc20 = getCoffeERC20();
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
  }, []);
  return { farmRegistered };
};

export default FarmListener;
