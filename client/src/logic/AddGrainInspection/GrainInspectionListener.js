import { useState, useEffect } from 'react';
import { getCoffeERC20 } from '../erc20';

const GrainInspectionListener = () => {
  const [grainRegistered, setGrainRegistered] = useState([]);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const erc20 = getCoffeERC20();
      erc20.on('SetGrainData', (user, batchNo, event) => {
        setGrainRegistered({
          user,
          batchNo,
          tx: event.transactionHash,
        });
      });
      return () => {
        erc20.removeAllListeners('SetGrainData');
      };
    }
  }, []);
  return { grainRegistered };
};

export default GrainInspectionListener;
