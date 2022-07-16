import { getCoffe1ERC20, infuraGetCoffe1ERC20 } from '../erc20';

const AskNextActionInfura = async (values) => {
  const erc20Infura = await infuraGetCoffe1ERC20();
  const erc20 = await getCoffe1ERC20();
  try {
    const info = await erc20Infura.callStatic.getNextAction(values.batchNo);
    return { data: info, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};

export default AskNextActionInfura;
