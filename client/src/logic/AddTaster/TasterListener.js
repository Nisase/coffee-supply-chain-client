import { useState, useEffect } from 'react';
import { getCoffe1ERC20 } from '../erc20';

const TasterListener = () => {
  const [tasterRegistered, setTasterRegistered] = useState([]);

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const erc20 = getCoffe1ERC20();
      erc20.on('DoneTasting', (user, batchNo, event) => {
        setTasterRegistered({
          user,
          batchNo,
          tx: event.transactionHash,
        });
      });
      return () => {
        erc20.removeAllListeners('DoneTasting');
      };
    }
  }, []);
  return { tasterRegistered };
};

export default TasterListener;
