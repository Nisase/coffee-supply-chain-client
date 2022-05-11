import { useState, useEffect } from 'react';
import { getCoffeERC20 } from '../erc20';

const ShipRetailerListener = () => {
  const [shipRetailerRegistered, setShipRetailerRegistered] = useState([]);

  useEffect(() => {
    const erc20 = getCoffeERC20();
    erc20.on('DoneShippingRetailer', (user, batchNo) => {
      console.log({ user, batchNo });
      setShipRetailerRegistered((currentData) => [
        ...currentData,
        {
          user,
          batchNo,
        },
      ]);
    });
    return () => {
      erc20.removeAllListeners('DoneShippingRetailer');
    };
  }, []);

  return shipRetailerRegistered;
};

export default ShipRetailerListener;
