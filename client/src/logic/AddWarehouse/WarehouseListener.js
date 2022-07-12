import { useState, useEffect } from 'react';
import { getCoffe2ERC20 } from '../erc20';

const WarehouseListener = () => {
  const [warehouseRegistered, setWarehouseRegistered] = useState({});

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const erc20 = getCoffe2ERC20();
      erc20.on('DoneWarehousing', (user, batchNo, event) => {
        setWarehouseRegistered({
          user,
          batchNo,
          tx: event.transactionHash,
        });
      });
      return () => {
        erc20.removeAllListeners('DoneWarehousing');
      };
    }
  }, []);
  return { warehouseRegistered };
};

export default WarehouseListener;
