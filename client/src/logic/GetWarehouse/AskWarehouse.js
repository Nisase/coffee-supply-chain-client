import { infuraGetCoffe2ERC20 } from '../erc20';

const AskWarehouse = async (values) => {
  
  try {
    const erc20Infura = await infuraGetCoffe2ERC20();
    const info = await erc20Infura.callStatic.getWarehousingData(values.batchNo);
    return { data: info, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};

export default AskWarehouse;
