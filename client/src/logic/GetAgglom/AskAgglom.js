import { getCoffeERC20 } from '../erc20';

const AskAgglom = async (values) => {
  const erc20 = await getCoffeERC20();

  try {
    const info = await erc20.callStatic.getAgglomData(values.batchNo);
    return { data: info, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};

export default AskAgglom;
