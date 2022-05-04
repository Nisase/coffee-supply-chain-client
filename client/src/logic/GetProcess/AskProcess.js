import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import coffeeSupplyChainABI from '../../contracts/CoffeeSupplyChain.json';

const CoffeeSupplyChainAddress = '0xa108A7C2e0417aF523eadFA4Cf628126BEFB0534';

const AskProcess = async (values) => {
  console.log('PROCESS INFO');
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const erc20 = new ethers.Contract(CoffeeSupplyChainAddress, coffeeSupplyChainABI.abi, signer);

  try {
    const info = await erc20.callStatic.getProcessData(values.batchNo);
    console.log(info);
  } catch (error) {
    console.log('ERROR AT GETTING HARVEST INFO: ', error);
  }
};

export default AskProcess;
