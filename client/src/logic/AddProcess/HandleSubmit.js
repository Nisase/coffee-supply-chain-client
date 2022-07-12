import { getCoffeWriter1ERC20 } from '../erc20';

const HandleSubmit = (values) => {
  const erc20 = getCoffeWriter1ERC20();
  return erc20.addProcessData(
    values.batchNo,
    values.processorAddress,
    values.typeOfDrying,
    values.roastImageHash,
    [values.roastTemp, values.typeOfRoast],
    [values.roastDate, values.millDate],
    values.processorPricePerKilo,
    values.processBatchWeight
  );
};

export default HandleSubmit;
