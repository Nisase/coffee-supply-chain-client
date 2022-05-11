import { useState, useEffect } from 'react';
import { getCoffeERC20 } from '../erc20';

const ShipPackerListener = () => {
  const [shipPackerRegistered, setShipPackerRegistered] = useState([]);

  useEffect(() => {
    const erc20 = getCoffeERC20();
    erc20.on('DoneShippingPacker', (user, batchNo) => {
      console.log({ user, batchNo });
      setShipPackerRegistered((currentData) => [
        ...currentData,
        {
          user,
          batchNo,
        },
      ]);
    });
    return () => {
      erc20.removeAllListeners('DoneShippingPacker');
    };
  }, []);

  return shipPackerRegistered;
};

export default ShipPackerListener;
