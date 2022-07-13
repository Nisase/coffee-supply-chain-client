import { getCoffe2ERC20 } from '../erc20';

const AskWarehouse = async (values) => {
  const erc20 = await getCoffe2ERC20();

  try {
    const info = await erc20.callStatic.getWarehousingData(values.batchNo);
    return { data: info, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};

export default AskWarehouse;
