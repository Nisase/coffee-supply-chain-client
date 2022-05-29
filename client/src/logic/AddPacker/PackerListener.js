import { useState, useEffect } from 'react';
import { getCoffeERC20 } from '../erc20';

const PackerListener = () => {
  const [packRegistered, setPackRegistered] = useState({});

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const erc20 = getCoffeERC20();
      erc20.on('DonePackaging', (user, batchNo, event) => {
        setPackRegistered({
          user,
          batchNo,
          tx: event.transactionHash,
        });
      });
      return () => {
        erc20.removeAllListeners('DonePackaging');
      };
    }
  }, []);

  return { packRegistered };
};

export default PackerListener;
