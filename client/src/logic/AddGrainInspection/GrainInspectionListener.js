import { useState, useEffect } from 'react';
import { getCoffeERC20 } from '../erc20';

const CoffeeSupplyChainAddress = '0xa108A7C2e0417aF523eadFA4Cf628126BEFB0534';

const GrainInspectionListener = () => {
  const [grainRegistered, setGrainRegistered] = useState([]);

  useEffect(() => {
    const erc20 = getCoffeERC20();
    erc20.on('SetGrainData', (user, batchNo) => {
      console.log({ user, batchNo });
      setGrainRegistered((currentData) => [
        ...currentData,
        {
          user,
          batchNo,
        },
      ]);
    });
    return () => {
      erc20.removeAllListeners('SetGrainData');
    };
  }, []);
  return grainRegistered;
};

export default GrainInspectionListener;
