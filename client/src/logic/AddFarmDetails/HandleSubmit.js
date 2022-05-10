import { getCoffeWriterERC20 } from '../erc20'

const HandleSubmit = async (values) => {
  
  const erc20 = await getCoffeWriterERC20();
  await erc20.addFarmDetails(
    values.registrationNo,
    values.farmName,
    values.latitude,
    values.longitude,
    values.farmAddress
  );
};

export default HandleSubmit;
