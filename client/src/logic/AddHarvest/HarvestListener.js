import { useState, useEffect } from 'react';
import { getCoffe1ERC20 } from '../erc20';

const HarvestListener = () => {
  const [harvestRegistered, setHarvestRegistered] = useState({});

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const erc20 = getCoffe1ERC20();

      erc20.on('DoneHarvesting', (user, batchNo, event) => {
        setHarvestRegistered({
          user,
          batchNo,
          tx: event.transactionHash,
        });
      });
      return () => {
        erc20.removeAllListeners('DoneHarvesting');
      };
    }
  }, []);
  return { harvestRegistered };
};

export default HarvestListener;
