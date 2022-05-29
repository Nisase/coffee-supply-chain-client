import { useState, useEffect } from 'react';
import { getCoffeERC20 } from '../erc20';

const ProcessListener = () => {
  const [processRegistered, setProcessRegistered] = useState({});

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const erc20 = getCoffeERC20();
      erc20.on('DoneProcessing', (user, batchNo, event) => {
        setProcessRegistered({
          user,
          batchNo,
          tx: event.transactionHash,
        });
      });
      return () => {
        erc20.removeAllListeners('DoneProcessing');
      };
    }
  }, []);
  return { processRegistered };
};

export default ProcessListener;
