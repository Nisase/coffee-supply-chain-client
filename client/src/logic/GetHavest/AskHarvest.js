import { infuraGetCoffe1ERC20 } from '../erc20';

const AskHarvest = async (values) => {
  const erc20Infura = await infuraGetCoffe1ERC20();

  try {
    // const info = await erc20.callStatic.getHarvestData(values.batchNo);
    const info = await erc20Infura.callStatic.getHarvestData(values.batchNo);
    return { data: info, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};

export default AskHarvest;
