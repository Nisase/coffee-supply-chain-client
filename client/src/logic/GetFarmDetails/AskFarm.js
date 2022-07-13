import { getCoffe1ERC20, infuraGetCoffe1ERC20 } from '../erc20';

const AskFarm = async (values) => {
  const erc20 = await getCoffe1ERC20();
  const erc20Infura = await infuraGetCoffe1ERC20();

  try {
    // const farmer = await erc20.callStatic.getFarmDetails(values.batchNo);
    const farmer = await erc20Infura.callStatic.getFarmDetails(values.batchNo);
    return { data: farmer, error: null };
  } catch (err) {
    // console.log('ERROR AT GETTING FARM DETAILS: ', error);
    return { data: null, error: err };
  }
};

export default AskFarm;
