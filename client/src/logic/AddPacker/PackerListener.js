import { useState, useEffect } from 'react';
import { getCoffe2ERC20 } from '../erc20';

const PackerListener = () => {
  const [packRegistered, setPackRegistered] = useState({});

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const erc20 = getCoffe2ERC20();
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
