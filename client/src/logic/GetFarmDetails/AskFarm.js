import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import coffeeSupplyChainABI from '../../contracts/CoffeeSupplyChain.json';

const CoffeeSupplyChainAddress = '0xa108A7C2e0417aF523eadFA4Cf628126BEFB0534';

const AskFarm = async (values) => {
  console.log('FARM DETAILS');
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const erc20 = new ethers.Contract(CoffeeSupplyChainAddress, coffeeSupplyChainABI.abi, signer);

  try {
    const farmer = await erc20.callStatic.getFarmDetails(values.batchNo);
    console.log(farmer);
  } catch (error) {
    console.log('ERROR AT GETTING FARM DETAILS: ', error);
  }
};

export default AskFarm;
