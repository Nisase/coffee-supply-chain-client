import { useEffect, useState, useLayoutEffect } from 'react';
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

import {
  setWalletAddress,
  setLoading,
  setUserData,
  setMessage,
  setIsOwer,
  userDataSelector,
  walletAddressSelector,
  loadingSelector,
} from './redux/appDataSlice';
import { setCoffeAddress, setUserAddress } from './redux/contractsAddressSlice';
import { txListSelector, removeTx } from './redux/txSlice';

import getUserByAddress from './logic/GetUser';
import getOwner from './logic/GetOwner';

function App() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // UserInfo, Wallet and Owner //
  const [walletAddress, error] = useDetectProvider();
  const [isOwner, setIsOwner] = useState(false);
  const userData = useSelector(userDataSelector);
  const loading = useSelector(loadingSelector);
  const walletAddressApp = useSelector(walletAddressSelector);

  useLayoutEffect(() => {
    console.log("SET ADDRES")
    // const userAddress = '0xA898D61bD7Ed054C5cEd27Fce111BcC0B3C270d8';
    const userAddress = '0xfd6407812e082583E4B9A00A917fae8D0F8D709B';
    // const coffeAddress = '0x37F97d0D133c2217Fa058944eA3C69B030e658FC';
    const coffeAddress = '0x5F87cD4E112beb3AF8918Be2Eb232DdEF032f69d';
    
    window.userAddress = userAddress;
    window.coffeAddress = coffeAddress;
    console.log(window.coffeAddress)

    dispatch(setUserAddress(userAddress));
    dispatch(setCoffeAddress(coffeAddress));
  }, []);

  useEffect(() => {
    dispatch(setWalletAddress(walletAddress));
  }, [walletAddress]);

  useEffect(() => {
    const getUserLocal = async (walletAddress) => {
      dispatch(setLoading(true));
      const user = await getUserByAddress(walletAddress);
      const owner = await getOwner();
      setIsOwner(owner === walletAddress);
      dispatch(setIsOwer(isOwner));

      if (user && user.message === null) {
        if (isOwner) {
          user.name = 'Administrador';
          user.role = 'ADMIN';
          user.email = 'admincoffe@.epn.edu.ec';
        }
        if (user.role === '' || user.name === '') {
          dispatch(setUserData(null));
          dispatch(setLoading(false));
          return;
        }
        dispatch(setUserData(user));
        dispatch(setMessage(''));
      } else dispatch(setMessage(user.message));

      dispatch(setLoading(false));
    };

    const setNullUserLocal = () => {
      dispatch(setIsOwer(false));
      dispatch(setUserData(null));
      dispatch(setMessage(''));
    };

    if (walletAddressApp) getUserLocal(walletAddressApp);
    else setNullUserLocal();
  }, [walletAddressApp, isOwner]);

  // END //

  // Transactions Listeners in APP //
  const txList = useSelector(txListSelector);
  const txIsContain = (tx, type) => txList.some((item) => item.tx === tx && item.type === type);

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

  const getValidUser = (userData) => {
    if (!userData || userData.role === '') return null;
    return userData;
  };

  // END //

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      {useRoutes(routes(loading, getValidUser(userData), isOwner))}
    </ThemeProvider>
  );
}

export default App;
