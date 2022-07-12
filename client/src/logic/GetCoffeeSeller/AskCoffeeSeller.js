import { getCoffe1ERC20 } from '../erc20';

const AskCoffeeSeller = async (values) => {
  const erc20 = await getCoffe1ERC20();

  try {
    const info = await erc20.callStatic.getCoffeeSellData(values.batchNo);
    return { data: info, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};

export default AskCoffeeSeller;
