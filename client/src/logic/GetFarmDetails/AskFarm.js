import { getCoffeERC20} from '../erc20'

const AskFarm = async (values) => {
  const erc20 = await getCoffeERC20()

  try {
    const farmer = await erc20.callStatic.getFarmDetails(values.batchNo);
    console.log(farmer);
  } catch (error) {
    console.log('ERROR AT GETTING FARM DETAILS: ', error);
  }
};

export default AskFarm;
