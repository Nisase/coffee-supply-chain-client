import { infuraGetCoffe2ERC20 } from '../erc20';

const AskShipPacker = async (values) => {
  
  try {
    const erc20Infura = await infuraGetCoffe2ERC20();
    const info = await erc20Infura.callStatic.getShipPackerData(values.batchNo);
    return { data: info, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};

export default AskShipPacker;
