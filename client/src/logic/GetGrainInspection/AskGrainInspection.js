import { getCoffeERC20 } from '../erc20';

const AskGrainInspection = async (values) => {
  const erc20 = await getCoffeERC20();

  try {
    const info = await erc20.callStatic.getGrainData(values.batchNo);
    return { data: info, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};

export default AskGrainInspection;
