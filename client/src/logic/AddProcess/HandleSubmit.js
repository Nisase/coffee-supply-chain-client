import { getCoffeWriterERC20 } from '../erc20';

const HandleSubmit = (values) => {
  const erc20 = getCoffeWriterERC20();
  return erc20.addProcessData(
    values.batchNo,
    values.procAddress,
    values.typeOfDrying,
    values.roastImageHash,
    values.roastTemp,
    values.typeOfRoast,
    values.roastDate,
    values.millDate,
    values.processorPrice
  );
};

export default HandleSubmit;
