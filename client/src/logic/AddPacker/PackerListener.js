import { useState, useEffect } from 'react';
import { getCoffeERC20 } from '../erc20';

const PackerListener = () => {
  const [packRegistered, setPackRegistered] = useState([]);

  useEffect(() => {
    const erc20 = getCoffeERC20();
    erc20.on('DonePackaging', (user, batchNo) => {
      console.log({ user, batchNo });
      setPackRegistered((currentData) => [
        ...currentData,
        {
          user,
          batchNo,
        },
      ]);
    });
    return () => {
      erc20.removeAllListeners('DonePackaging');
    };
  }, []);

  return packRegistered;
};

export default PackerListener;
