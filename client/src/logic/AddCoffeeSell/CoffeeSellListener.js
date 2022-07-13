import { useState, useEffect } from 'react';
import { getCoffe1ERC20 } from '../erc20';

const CoffeeSellListener = () => {
  const [coffeeSellRegistered, setCoffeeSellRegistered] = useState({});

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const erc20 = getCoffe1ERC20();

      erc20.on('DoneCoffeeSelling', (user, batchNo, event) => {
        // console.log({ user, batchNo });
        setCoffeeSellRegistered({
          user,
          batchNo,
          tx: event.transactionHash,
        });
      });
      return () => {
        erc20.removeAllListeners('DoneCoffeeSelling');
      };
    }
  }, []);
  return { coffeeSellRegistered };
};

export default CoffeeSellListener;
