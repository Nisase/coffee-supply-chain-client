import { useState, useEffect } from 'react';
import { getCoffeERC20 } from '../erc20';

// import { ethers } from 'ethers';
// import coffeeSupplychainABI from '../../contracts/CoffeeSupplyChain.json';

// const CoffeeSupplyChainAddress = '0xa108A7C2e0417aF523eadFA4Cf628126BEFB0534';

const HarvestListener = () => {
  const [harvestRegistered, setHarvestRegistered] = useState([]);

  useEffect(() => {
    const erc20 = getCoffeERC20();
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // const erc20 = new ethers.Contract(CoffeeSupplyChainAddress, coffeeSupplychainABI.abi, signer);
    erc20.on('DoneHarvesting', (user, batchNo) => {
      console.log({ user, batchNo });
      setHarvestRegistered((currentData) => [
        ...currentData,
        {
          user,
          batchNo,
        },
      ]);
    });
    return () => {
      erc20.removeAllListeners('DoneHarvesting');
    };
  }, []);
  return harvestRegistered;
};

export default HarvestListener;
