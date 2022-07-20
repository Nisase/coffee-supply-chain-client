import { infuraGetCoffe1ERC20 } from '../erc20';

const AskFarm = async (values) => {
  try {
    const erc20Infura = await infuraGetCoffe1ERC20();
    const farmer = await erc20Infura.callStatic.getFarmDetails(values.batchNo);
    return { data: farmer, error: null };
  } catch (err) {
    // console.log('ERROR AT GETTING FARM DETAILS: ', error);
    return { data: null, error: err };
  }
};

export default AskFarm;
