import { useState, useEffect } from 'react';
import { getCoffeERC20 } from '../erc20';

const HarvestListener = () => {
  const [harvestRegistered, setHarvestRegistered] = useState([]);

  useEffect(() => {
    const erc20 = getCoffeERC20();

    erc20.on('DoneHarvesting', (user, batchNo) => {
      console.log({ user, batchNo });
      setHarvestRegistered((currentData) => [
        ...currentData,
        {
          user,
          batchNo,
        },
      ]);
    });
    return () => {
      erc20.removeAllListeners('DoneHarvesting');
    };
  }, []);
  return harvestRegistered;
};

export default HarvestListener;
