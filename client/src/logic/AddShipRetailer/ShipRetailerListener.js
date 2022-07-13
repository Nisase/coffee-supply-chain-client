import { useState, useEffect } from 'react';
import { getCoffe2ERC20 } from '../erc20';

const ShipRetailerListener = () => {
  const [shipRetailerRegistered, setShipRetailerRegistered] = useState({});

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const erc20 = getCoffe2ERC20();
      erc20.on('DoneShippingRetailer', (user, batchNo, event) => {
        setShipRetailerRegistered({
          user,
          batchNo,
          tx: event.transactionHash,
        });
      });
      return () => {
        erc20.removeAllListeners('DoneShippingRetailer');
      };
    }
  }, []);

  return { shipRetailerRegistered };
};

export default ShipRetailerListener;
