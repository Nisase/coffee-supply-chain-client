import { getCoffeWriterERC20 } from '../erc20';

const HandleSubmit = async (values) => {
  const erc20 = await getCoffeWriterERC20();

  await erc20.addHarvestData(
    values.batchNo,
    values.coffeeFamily,
    values.typeOfSeed,
    values.fertilizerUsed,
    values.harvestDate
  );
};

export default HandleSubmit;
