import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import coffeeSupplychainABI from '../../contracts/CoffeeSupplyChain.json';

const CoffeeSupplyChainAddress = '0xa108A7C2e0417aF523eadFA4Cf628126BEFB0534';

const ProcessListener = () => {
  const [processRegistered, setProcessRegistered] = useState([]);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const erc20 = new ethers.Contract(CoffeeSupplyChainAddress, coffeeSupplychainABI.abi, signer);
    erc20.on('DoneProcessing', (user, batchNo) => {
      console.log({ user, batchNo });
      setProcessRegistered((currentData) => [
        ...currentData,
        {
          user,
          batchNo,
        },
      ]);
    });
    return () => {
      erc20.removeAllListeners('DoneProcessing');
    };
  }, []);
};

export default ProcessListener;
