import { useState, useEffect } from 'react';
import { getCoffeERC20 } from '../erc20';

const AgglomListener = () => {
  const [agglomRegistered, setAgglomRegistered] = useState({});

  useEffect(() => {
    const erc20 = getCoffeERC20();
    erc20.on('DoneAgglomeration', (user, batchNo, event) => {
      setAgglomRegistered({
        user,
        batchNo,
        tx: event.transactionHash,
      });
    });
    return () => {
      erc20.removeAllListeners('DoneAgglomeration');
    };
  }, []);
  return { agglomRegistered };
};

export default AgglomListener;
