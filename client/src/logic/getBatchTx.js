import { infuraGetCoffe1ERC20, infuraGetCoffe2ERC20 } from './erc20';

export const getFarmTx = async (batchNoIn) => {
  const erc1 = infuraGetCoffe1ERC20();
  const txHarvest = await erc1.queryFilter(erc1.filters.SetFarmDetails(null, batchNoIn));
  const user = txHarvest[0].args.user;
  const txHash = txHarvest[0].transactionHash;
  const timestamp = (await txHarvest[0].getBlock()).timestamp;

  return [user, txHash, timestamp];
};

export const getHarvestTx = async (batchNoIn) => {
  const erc1 = infuraGetCoffe1ERC20();
  const txHarvest = await erc1.queryFilter(erc1.filters.DoneHarvesting(null, batchNoIn));
  const user = txHarvest[0].args.user;
  const txHash = txHarvest[0].transactionHash;
  const timestamp = (await txHarvest[0].getBlock()).timestamp;

  return [user, txHash, timestamp];
};

export const getProcessTx = async (batchNoIn) => {
  const erc1 = infuraGetCoffe1ERC20();
  const txHarvest = await erc1.queryFilter(erc1.filters.DoneProcessing(null, batchNoIn));
  const user = txHarvest[0].args.user;
  const txHash = txHarvest[0].transactionHash;
  const timestamp = (await txHarvest[0].getBlock()).timestamp;

  return [user, txHash, timestamp];
};

export const getTasteTx = async (batchNoIn) => {
  const erc1 = infuraGetCoffe1ERC20();
  const txHarvest = await erc1.queryFilter(erc1.filters.DoneTasting(null, batchNoIn));
  const user = txHarvest[0].args.user;
  const txHash = txHarvest[0].transactionHash;
  const timestamp = (await txHarvest[0].getBlock()).timestamp;

  return [user, txHash, timestamp];
};

export const getSellTx = async (batchNoIn) => {
  const erc1 = infuraGetCoffe1ERC20();
  const txHarvest = await erc1.queryFilter(erc1.filters.DoneCoffeeSelling(null, batchNoIn));
  const user = txHarvest[0].args.user;
  const txHash = txHarvest[0].transactionHash;
  const timestamp = (await txHarvest[0].getBlock()).timestamp;

  return [user, txHash, timestamp];
};

export const getWarehouseTx = async (batchNoIn) => {
  const erc2 = infuraGetCoffe2ERC20();
  const txHarvest = await erc2.queryFilter(erc2.filters.DoneWarehousing(null, batchNoIn));
  const user = txHarvest[0].args.user;
  const txHash = txHarvest[0].transactionHash;
  const timestamp = (await txHarvest[0].getBlock()).timestamp;

  return [user, txHash, timestamp];
};

export const getShipPackerTx = async (batchNoIn) => {
  const erc2 = infuraGetCoffe2ERC20();
  const txHarvest = await erc2.queryFilter(erc2.filters.DoneShippingPacker(null, batchNoIn));
  const user = txHarvest[0].args.user;
  const txHash = txHarvest[0].transactionHash;
  const timestamp = (await txHarvest[0].getBlock()).timestamp;

  return [user, txHash, timestamp];
};

export const getPackerTx = async (batchNoIn) => {
  const erc2 = infuraGetCoffe2ERC20();
  const txHarvest = await erc2.queryFilter(erc2.filters.DonePackaging(null, batchNoIn));
  const user = txHarvest[0].args.user;
  const txHash = txHarvest[0].transactionHash;
  const timestamp = (await txHarvest[0].getBlock()).timestamp;

  return [user, txHash, timestamp];
};

export const getShipRetailerTx = async (batchNoIn) => {
  const erc2 = infuraGetCoffe2ERC20();
  const txHarvest = await erc2.queryFilter(erc2.filters.DoneShippingRetailer(null, batchNoIn));
  const user = txHarvest[0].args.user;
  const txHash = txHarvest[0].transactionHash;
  const timestamp = (await txHarvest[0].getBlock()).timestamp;

  return [user, txHash, timestamp];
};

export const getRetailerTx = async (batchNoIn) => {
  const erc2 = infuraGetCoffe2ERC20();
  const txHarvest = await erc2.queryFilter(erc2.filters.DoneRetailer(null, batchNoIn));
  const user = txHarvest[0].args.user;
  const txHash = txHarvest[0].transactionHash;
  const timestamp = (await txHarvest[0].getBlock()).timestamp;

  return [user, txHash, timestamp];
};
