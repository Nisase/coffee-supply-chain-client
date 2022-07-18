import { useEffect, useState } from 'react';
import { useNavigate, Outlet, useSearchParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material
import { styled } from '@mui/material/styles';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

import { userDataSelector } from '../../redux/appDataSlice';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE +50,
  paddingBottom: theme.spacing(20),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 50,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const userInfo = useSelector(userDataSelector);

  const batch = searchParams.get("batch")

  useEffect(()=>{
    if(batch && batch.length===42 && (pathname==="/dashboard" || pathname==="/dashboard/")){
      let localPathname = "/dashboard";
      if( userInfo.role.findIndex((iRole) => iRole.key === 'FARMER') !== -1 ) localPathname += "/AddHarvest";
      else if( userInfo.role.findIndex((iRole) => iRole.key === 'PROCESSOR') !== -1 ) localPathname += "/AddProcess";
      else if( userInfo.role.findIndex((iRole) => iRole.key === 'TASTER') !== -1 ) localPathname += "/AddProcess";
      else if( userInfo.role.findIndex((iRole) => iRole.key === 'SELLER') !== -1 ) localPathname += "/AddProcess";
      else if( userInfo.role.findIndex((iRole) => iRole.key === 'WAREHOUSE') !== -1 ) localPathname += "/AddProcess";
      else if( userInfo.role.findIndex((iRole) => iRole.key === 'SHIPPER_PACKER') !== -1 ) localPathname += "/AddProcess";
      else if( userInfo.role.findIndex((iRole) => iRole.key === 'PACKER') !== -1 ) localPathname += "/AddProcess";
      else if( userInfo.role.findIndex((iRole) => iRole.key === 'SHIPPER_RETAILER') !== -1 ) localPathname += "/AddProcess";
      else if( userInfo.role.findIndex((iRole) => iRole.key === 'RETAILER') !== -1 ) localPathname += "/AddProcess";
      
      if(localPathname !== "/dashboard" ) navigate(`${localPathname}?batch=${batch}`)
    } 
  })

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
