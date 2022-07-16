import { getCoffeWriter1ERC20 } from '../erc20';

const HandleSubmit = (values) => {
  const erc20 = getCoffeWriter1ERC20();
  return erc20.addHarvestData(
    values.batchNo,
    values.seedSupplier,
    values.typeOfSeed,
    values.coffeeFamily,
    values.fertilizerUsed,
    String(values.harvestDate),
    values.humidityPercentage,
    values.batchWeight
  );
};

export default HandleSubmit;
