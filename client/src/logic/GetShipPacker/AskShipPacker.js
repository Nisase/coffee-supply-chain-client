import { getCoffe2ERC20, infuraGetCoffe2ERC20 } from '../erc20';

const AskShipPacker = async (values) => {
  const erc20 = await getCoffe2ERC20();
  const erc20Infura = await infuraGetCoffe2ERC20();

  try {
    // const info = await erc20.callStatic.getShipPackerData(values.batchNo);
    const info = await erc20Infura.callStatic.getShipPackerData(values.batchNo);
    return { data: info, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};

export default AskShipPacker;
