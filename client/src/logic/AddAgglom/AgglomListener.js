import { useState, useEffect } from 'react';
import { getCoffeERC20 } from '../erc20';

const AgglomListener = () => {
  const [agglomRegistered, setAgglomRegistered] = useState([]);

  useEffect(() => {
    const erc20 = getCoffeERC20();
    erc20.on('DoneAgglomeration', (user, batchNo) => {
      console.log({ user, batchNo });
      setAgglomRegistered((currentData) => [
        ...currentData,
        {
          user,
          batchNo,
        },
      ]);
    });
    return () => {
      erc20.removeAllListeners('DoneAgglomeration');
    };
  }, []);
  return agglomRegistered;
};

export default AgglomListener;
