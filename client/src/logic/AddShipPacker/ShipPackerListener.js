import { useState, useEffect } from 'react';
import { getCoffe2ERC20 } from '../erc20';

const ShipPackerListener = () => {
  const [shipPackerRegistered, setShipPackerRegistered] = useState({});

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const erc20 = getCoffe2ERC20();
      erc20.on('DoneShippingPacker', (user, batchNo, event) => {
        setShipPackerRegistered({
          user,
          batchNo,
          tx: event.transactionHash,
        });
      });
      return () => {
        erc20.removeAllListeners('DoneShippingPacker');
      };
    }
  }, []);

  return { shipPackerRegistered };
};

export default ShipPackerListener;
