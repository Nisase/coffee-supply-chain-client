import { useState, useEffect } from 'react';
import { getCoffeERC20 } from '../erc20';

const ProcessListener = () => {
  const [processRegistered, setProcessRegistered] = useState([]);

  useEffect(() => {
    const erc20 = getCoffeERC20();
    erc20.on('DoneProcessing', (user, batchNo) => {
      console.log({ user, batchNo });
      setProcessRegistered((currentData) => [
        ...currentData,
        {
          user,
          batchNo,
        },
      ]);
    });
    return () => {
      erc20.removeAllListeners('DoneProcessing');
    };
  }, []);
  return processRegistered;
};

export default ProcessListener;
