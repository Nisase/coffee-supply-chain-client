import { getCoffe1ERC20 } from '../erc20';

const AskProcess = async (values) => {
  const erc20 = await getCoffe1ERC20();

  try {
    const info = await erc20.callStatic.getProcessData(values.batchNo);
    return { data: info, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};

export default AskProcess;
