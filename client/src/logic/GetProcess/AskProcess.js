import { infuraGetCoffe1ERC20 } from '../erc20';

const AskProcess = async (values) => {
  
  try {
    const erc20Infura = await infuraGetCoffe1ERC20();
    const info = await erc20Infura.callStatic.getProcessData(values.batchNo);
    return { data: info, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};

export default AskProcess;
