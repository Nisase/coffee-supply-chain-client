import { getCoffeWriterERC20 } from '../erc20';

const HandleSubmit = (values) => {
  const erc20 = getCoffeWriterERC20();
  return erc20.addHarvestData(
    values.batchNo,
    values.coffeeFamily,
    values.typeOfSeed,
    values.fertilizerUsed,
    values.harvestDate
  );
};

export default HandleSubmit;
