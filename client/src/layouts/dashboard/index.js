import { useEffect, useState } from 'react';
import { useNavigate, Outlet, useSearchParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material
import { styled } from '@mui/material/styles';
//
import { useSnackbar } from 'notistack';
import AskNextAction from '../../logic/GetNextAction/AskNextAction';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

import { userDataSelector } from '../../redux/appDataSlice';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 50,
  paddingBottom: theme.spacing(20),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 50,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const userInfo = useSelector(userDataSelector);
  const { enqueueSnackbar } = useSnackbar();

  const batch = searchParams.get('batch');

  const goAddData = (roleUser, roleRequired, pathname, pathnameAdmin, batch, nextAction) => {
    if (roleUser.findIndex((iRole) => iRole.key === roleRequired) !== -1) {
      let localPathname = '/dashboard';
      if (nextAction === roleRequired) {
        localPathname += pathname;
        navigate(`${localPathname}?batch=${batch}`);
        enqueueSnackbar(`Estimado usuario ingrese la información correspondiente al lote de café seleccionado`, {
          variant: 'success',
        });
        return true;
      }
      if(roleUser && roleUser.length>1) return false;

      navigate(`${localPathname}/${pathnameAdmin}`);
      enqueueSnackbar(
        `Estimado usuario su rol no corresponde al estado actual del lote de café seleccionado`,
        { variant: 'success' }
      );
      return true;
    }
    return false;
  };

  const goAdminPage = (roleUser, roleRequired, pathname) => {
    if (roleUser.findIndex((iRole) => iRole.key === roleRequired) !== -1) {
      navigate(`/dashboard/${pathname}`);
      return true;
    }
    return false;
  };

  const goFormByUserBatch = async (userInfo, batch) => {
    const nextActionLocal = await AskNextAction({ batchNo: batch });

    if (nextActionLocal && nextActionLocal.data) {
      let goToForm = false;
      const nextAction = nextActionLocal.data;

      if (nextAction === 'DONE') {
        enqueueSnackbar(
          `Estimad@ ${userInfo.name} ya se ha ingresado la información correspondiente al lote de café seleccionado`,
          { variant: 'info' }
        );
        navigate('/dashboard');
        return;
      }
      goToForm = goAddData(userInfo.role, 'FARMER', '/AddHarvest', 'Farmer', batch, nextAction);
      if (!goToForm) goToForm = goAddData(userInfo.role, 'PROCESSOR', '/AddProcess', 'Processor', batch, nextAction);
      if (!goToForm) goToForm = goAddData(userInfo.role, 'TASTER', '/AddTasting', 'Taster', batch, nextAction);
      if (!goToForm) goToForm = goAddData(userInfo.role, 'SELLER', '/AddCoffeeSelling', 'Seller', batch, nextAction);
      if (!goToForm) goToForm = goAddData(userInfo.role, 'WAREHOUSE', '/AddWarehouse', 'Warehouse', batch, nextAction);
      if (!goToForm) goToForm = goAddData(userInfo.role, 'SHIPPER_PACKER', '/AddShippingToPacker', 'ShipperToPacker', batch, nextAction);
      if (!goToForm) goToForm = goAddData(userInfo.role, 'PACKER', '/AddPackaging', 'Packer', batch, nextAction);
      if (!goToForm) goToForm = goAddData(userInfo.role, 'SHIPPER_RETAILER', '/AddShippingToRetailer', 'ShipperToRetailer', batch, nextAction);
      if (!goToForm) goToForm = goAddData(userInfo.role, 'RETAILER', '/AddRetailer', 'Retailer', batch, nextAction);

      if (!goToForm)
        enqueueSnackbar(
          `Estimad@ ${userInfo.name} el estado actual del lote de café no corresponde a los permisos que tiene actualmente`,
          { variant: 'error' }
        );
    } else {
      enqueueSnackbar(`Estimad@ ${userInfo.name} el lote seleccionado no corresponde a ningún lote de café ingresado`, {
        variant: 'error',
      });
      navigate(`/dashboard/${''}`);
    }
  };

  const goFormByUser = async (userInfo) => {
    let goToForm = goAdminPage(userInfo.role, 'ADMIN', 'Admin');
    if (!goToForm) goToForm = goAdminPage(userInfo.role, 'FARMER', 'Farmer');
    if (!goToForm) goToForm = goAdminPage(userInfo.role, 'PROCESSOR', 'Processor');
    if (!goToForm) goToForm = goAdminPage(userInfo.role, 'TASTER', 'Taster');
    if (!goToForm) goToForm = goAdminPage(userInfo.role, 'SELLER', 'Seller');
    if (!goToForm) goToForm = goAdminPage(userInfo.role, 'WAREHOUSE', 'Warehouse');
    if (!goToForm) goToForm = goAdminPage(userInfo.role, 'SHIPPER_PACKER', 'ShipperToPacker');
    if (!goToForm) goToForm = goAdminPage(userInfo.role, 'PACKER', 'Packer');
    if (!goToForm) goToForm = goAdminPage(userInfo.role, 'SHIPPER_RETAILER', 'ShipperToRetailer');
    if (!goToForm) goToForm = goAdminPage(userInfo.role, 'RETAILER', 'Retailer');
  };

  useEffect(() => {
    console.log('RENDER DASHBOARD');
    console.log(pathname);
    if (batch && batch.length === 42 && (pathname === '/dashboard' || pathname === '/dashboard/')) {
      goFormByUserBatch(userInfo, batch);
    } else if (pathname === '/dashboard' || pathname === '/dashboard/') {
      goFormByUser(userInfo);
    }
  });

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
