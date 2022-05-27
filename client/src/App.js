import { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import ThemeProvider from './theme';
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import routes from './routes';

import useDetectProvider from './hooks/useDetectProvider';

import UserAdminListener from './logic/AddUserAdmin/UserAdminListener';
import UpdateUserListener from './logic/UpdateUser/UpdateUserListener';
import FarmListener from './logic/AddFarmDetails/FarmListener';
import HarvestListener from './logic/AddHarvest/HarvestListener';
import ProcessListener from './logic/AddProcess/ProcessListener';
import GrainInspectionListener from './logic/AddGrainInspection/GrainInspectionListener';
import AgglomListener from './logic/AddAgglom/AgglomListener';
import ShipPackerListener from './logic/AddShipPacker/ShipPackerListener';
import PackerListener from './logic/AddPacker/PackerListener';
import ShipRetailerListener from './logic/AddShipRetailer/ShipRetailerListener';
import RetailerListener from './logic/AddRetailer/RetailerListener';

import { setWalletAddress, setUserData, setMessage, setIsOwer, userDataSelector } from './redux/appDataSlice';
import { setCoffeAddress, setUserAddress } from './redux/contractsAddressSlice';
import { txListSelector, removeTx } from './redux/txSlice';

import getUser from './logic/GetUser';
import getOwner from './logic/GetOwner';

function App() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // UserInfo, Wallet and Owner //
  const [walletAddress, error] = useDetectProvider(true);
  const [isOwner, setIsOwner] = useState(false);
  const [loadingLocal, setLoadingLocal] = useState(false);
  const userData = useSelector(userDataSelector);

  useEffect(() => {
    const userAddress = '0x8c3ADb90d52223eAf8C5BeD5a6D44da08d4b0BaE';
    const coffeAddress = '0xa108A7C2e0417aF523eadFA4Cf628126BEFB0534';
    dispatch(setUserAddress(userAddress));
    dispatch(setCoffeAddress(coffeAddress));

    window.userAddress = userAddress;
    window.coffeAddress = coffeAddress;
  });

  useEffect(() => {
    const getUserLocal = async () => {
      setLoadingLocal(true);
      const user = await getUser();
      const owner = await getOwner();
      setIsOwner(owner === walletAddress);
      dispatch(setIsOwer(isOwner));

      if (user && user.message === null) {
        if (isOwner) {
          user.name = 'Administrador';
          user.role = 'ADMIN';
          user.email = 'admincoffe@.epn.edu.ec';
        }
        if(user.role === '' || user.name === ''){
          dispatch(setUserData(null));
          setLoadingLocal(false);
          return
        }
        dispatch(setUserData(user));
        dispatch(setMessage(''))
      } else dispatch(setMessage(user.message));

      setLoadingLocal(false);
    };
    getUserLocal();
    dispatch(setWalletAddress(walletAddress));
  }, [walletAddress, isOwner]);

  // END //

  // Transactions Listeners in APP //
  const txList = useSelector(txListSelector);
  const txIsContain = (tx, type) => {
    return txList.some((item) => item.tx === tx && item.type === type);
  };

  const { userRegistered } = UserAdminListener();
  useEffect(() => {
    if (userRegistered !== undefined && txIsContain(userRegistered.tx, 'UserUpdate')) {
      enqueueSnackbar(`Usuario ${userRegistered.name} agregado correctamente`, { variant: 'success' });
      dispatch(removeTx({ tx: userRegistered.tx, type: 'UserUpdate' }));
    }
  }, [userRegistered, txList]);

  const { userUpdated } = UpdateUserListener();
  useEffect(() => {
    if (userUpdated !== undefined && txIsContain(userUpdated.tx, 'UserUpdate')) {
      enqueueSnackbar(`Usuario ${userUpdated.name} agregado correctamente`, { variant: 'success' });
      dispatch(removeTx({ tx: userUpdated.tx, type: 'UserUpdate' }));
    }
  }, [userUpdated, txList]);

  const { farmRegistered } = FarmListener();
  useEffect(() => {
    if (farmRegistered !== undefined && txIsContain(farmRegistered.tx, 'SetFarmDetails')) {
      enqueueSnackbar(`Granja agregada y lote de café ${farmRegistered.batchNo} creado correctamente`, {
        variant: 'success',
      });
      dispatch(removeTx({ tx: farmRegistered.tx, type: 'SetFarmDetails' }));
    }
  }, [farmRegistered, txList]);

  const { harvestRegistered } = HarvestListener();
  useEffect(() => {
    if (harvestRegistered !== undefined && txIsContain(harvestRegistered.tx, 'DoneHarvesting')) {
      enqueueSnackbar(`Datos de cosecha del lote de café ${harvestRegistered.batchNo} agregados correctamente`, {
        variant: 'success',
      });
      dispatch(removeTx({ tx: harvestRegistered.tx, type: 'DoneHarvesting' }));
    }
  }, [harvestRegistered, txList]);

  const { processRegistered } = ProcessListener();
  useEffect(() => {
    if (processRegistered !== undefined && txIsContain(processRegistered.tx, 'DoneProcessing')) {
      enqueueSnackbar(`Datos de procesamiento del lote de café ${processRegistered.batchNo} agregados correctamente`, {
        variant: 'success',
      });
      dispatch(removeTx({ tx: processRegistered.tx, type: 'DoneProcessing' }));
    }
  }, [processRegistered, txList]);

  const { grainRegistered } = GrainInspectionListener();
  useEffect(() => {
    if (grainRegistered !== undefined && txIsContain(grainRegistered.tx, 'SetGrainData')) {
      enqueueSnackbar(
        `Datos de inspección del grano correspondientes al lote de café ${grainRegistered.batchNo} agregados correctamente`,
        {
          variant: 'success',
        }
      );
      dispatch(removeTx({ tx: grainRegistered.tx, type: 'SetGrainData' }));
    }
  }, [grainRegistered, txList]);

  const { agglomRegistered } = AgglomListener();
  useEffect(() => {
    if (agglomRegistered !== undefined && txIsContain(agglomRegistered.tx, 'DoneAgglomeration')) {
      enqueueSnackbar(`Datos de aglomerado del lote de café ${agglomRegistered.batchNo} agregados correctamente`, {
        variant: 'success',
      });
      dispatch(removeTx({ tx: agglomRegistered.tx, type: 'DoneAgglomeration' }));
    }
  }, [agglomRegistered, txList]);

  const { shipPackerRegistered } = ShipPackerListener();
  useEffect(() => {
    if (shipPackerRegistered !== undefined && txIsContain(shipPackerRegistered.tx, 'DoneShippingPacker')) {
      enqueueSnackbar(
        `Datos de transporte hacia empacadora correspondientes al lote de café ${shipPackerRegistered.batchNo} agregados correctamente`,
        {
          variant: 'success',
        }
      );
      dispatch(removeTx({ tx: shipPackerRegistered.tx, type: 'DoneShippingPacker' }));
    }
  }, [shipPackerRegistered, txList]);

  const { packRegistered } = PackerListener();
  useEffect(() => {
    if (packRegistered !== undefined && txIsContain(packRegistered.tx, 'DonePackaging')) {
      enqueueSnackbar(
        `Datos de empacado correspondientes al lote de café ${packRegistered.batchNo} agregados correctamente`,
        {
          variant: 'success',
        }
      );
      dispatch(removeTx({ tx: packRegistered.tx, type: 'DonePackaging' }));
    }
  }, [packRegistered, txList]);

  const { shipRetailerRegistered } = ShipRetailerListener();
  useEffect(() => {
    if (shipRetailerRegistered !== undefined && txIsContain(shipRetailerRegistered.tx, 'DoneShippingRetailer')) {
      enqueueSnackbar(
        `Datos de transporte hacia el retailer correspondientes al lote de café ${shipRetailerRegistered.batchNo} agregados correctamente`,
        {
          variant: 'success',
        }
      );
      dispatch(removeTx({ tx: shipRetailerRegistered.tx, type: 'DoneShippingRetailer' }));
    }
  }, [shipRetailerRegistered, txList]);

  const { retailerRegistered } = RetailerListener();
  useEffect(() => {
    if (retailerRegistered !== undefined && txIsContain(retailerRegistered.tx, 'DoneRetailer')) {
      enqueueSnackbar(
        `Datos de retailer correspondientes al lote de café ${retailerRegistered.batchNo} agregados correctamente`,
        {
          variant: 'success',
        }
      );
      dispatch(removeTx({ tx: retailerRegistered.tx, type: 'DoneRetailer' }));
    }
  }, [retailerRegistered, txList]);

  // END //

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      {useRoutes(routes(loadingLocal, userData, isOwner))}
    </ThemeProvider>
  );
}

export default App;
