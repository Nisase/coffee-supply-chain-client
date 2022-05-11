import { getCoffeWriterERC20 } from '../erc20';

const HandleSubmit = async (values) => {
  const erc20 = await getCoffeWriterERC20();
  await erc20.addProcessData(
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
