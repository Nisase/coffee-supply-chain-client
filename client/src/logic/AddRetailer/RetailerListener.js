import { useState, useEffect } from 'react';
import { getCoffeERC20 } from '../erc20';

const RetailerListener = () => {
  const [retailerRegistered, setRetailerRegistered] = useState({});

  useEffect(() => {
    const erc20 = getCoffeERC20();
    erc20.on('DoneRetailer', (user, batchNo, event) => {
      setRetailerRegistered({
        user,
        batchNo,
        tx: event.transactionHash,
      });
    });
    return () => {
      erc20.removeAllListeners('DoneRetailer');
    };
  }, []);

  return { retailerRegistered };
};

export default RetailerListener;
