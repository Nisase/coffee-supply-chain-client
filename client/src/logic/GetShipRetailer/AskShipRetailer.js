import { infuraGetCoffe2ERC20 } from '../erc20';

const AskShipRetailer = async (values) => {
  const erc20Infura = await infuraGetCoffe2ERC20();

  try {
    const info = await erc20Infura.callStatic.getShipRetailerData(values.batchNo);
    return { data: info, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};

export default AskShipRetailer;
