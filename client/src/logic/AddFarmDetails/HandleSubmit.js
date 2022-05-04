import React from 'react';
import { ethers } from 'ethers';
import coffeeSupplychainABI from '../../contracts/CoffeeSupplyChain.json';

const CoffeeSupplyChainAddress = '0xa108A7C2e0417aF523eadFA4Cf628126BEFB0534';

const HandleSubmit = async (values) => {
  console.log(values);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send('eth_requestAccounts', []);
  const signer = await provider.getSigner();
  const erc20 = new ethers.Contract(CoffeeSupplyChainAddress, coffeeSupplychainABI.abi, signer);
  await erc20.addFarmDetails(
    values.registrationNo,
    values.farmName,
    values.latitude,
    values.longitude,
    values.farmAddress
  );
};

export default HandleSubmit;
