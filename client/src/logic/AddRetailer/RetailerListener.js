import { useState, useEffect } from 'react';
import { getCoffe2ERC20 } from '../erc20';

const RetailerListener = () => {
  const [retailerRegistered, setRetailerRegistered] = useState({});

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const erc20 = getCoffe2ERC20();
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
    }
  }, []);

  return { retailerRegistered };
};

export default RetailerListener;
