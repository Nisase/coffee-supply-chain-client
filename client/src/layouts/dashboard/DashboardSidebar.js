import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material
import { styled } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Avatar } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
import { userDataSelector } from '../../redux/appDataSlice';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));

const allOptionsNav = [
  {
    title: 'Agregar Usuario',
    path: '/dashboard/admin_addUsers',
    icon: 'eva:people-fill',
    role: 'ADMIN',
  },
  {
    title: 'Agregar Granja',
    path: '/dashboard/admin_addFarm',
    icon: 'iconoir:farm',
    role: 'ADMIN',
  },
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: 'eva:pie-chart-2-fill',
    role: 'ADMIN',
  },
  {
    title: 'Actualizar Perfil',
    path: '/dashboard/farmer_updateUser',
    icon: 'carbon:user-profile',
    role: 'FARMER',
  },
  {
    title: 'Agregar Cosecha',
    path: '/dashboard/farmer_addHarvest',
    icon: 'healthicons:plantation-worker-alt',
    role: 'FARMER',
  },
  {
    title: 'Actualizar Perfil',
    path: '/dashboard/processor_updateUser',
    icon: 'carbon:user-profile',
    role: 'PROCESSOR',
  },
  {
    title: 'Agregar Procesado',
    path: '/dashboard/processor_addProcess',
    icon: 'maki:watermill',
    role: 'PROCESSOR',
  },
  {
    title: 'Actualizar Perfil',
    path: '/dashboard/grainInspector_updateUser',
    icon: 'carbon:user-profile',
    role: 'GRAIN_INSPECTOR',
  },
  {
    title: 'Agregar Grano',
    path: '/dashboard/grainInspector_addGrain',
    icon: 'arcticons:beanconqueror',
    role: 'GRAIN_INSPECTOR',
  },
  {
    title: 'Actualizar Perfil',
    path: '/dashboard/agglomerator_updateUser',
    icon: 'carbon:user-profile',
    role: 'AGGLOMERATOR',
  },
  {
    title: 'Agregar Aglomerado',
    path: '/dashboard/agglomerator_addAgglom',
    icon: 'bi:house-door',
    role: 'AGGLOMERATOR',
  },
  {
    title: 'Actualizar Perfil',
    path: '/dashboard/shipPacker_updateUser',
    icon: 'carbon:user-profile',
    role: 'SHIPPER_PACKER',
  },
  {
    title: 'Agregar Transporte',
    path: '/dashboard/shipPacker_addShipment',
    icon: 'icon-park-solid:transporter',
    role: 'SHIPPER_PACKER',
  },
  {
    title: 'Actualizar Perfil',
    path: '/dashboard/packer_updateUser',
    icon: 'carbon:user-profile',
    role: 'PACKER',
  },
  {
    title: 'Agregar Empacado',
    path: '/dashboard/packer_addPackage',
    icon: 'codicon:package',
    role: 'PACKER',
  },
  {
    title: 'Actualizar Perfil',
    path: '/dashboard/shipRetailer_updateUser',
    icon: 'carbon:user-profile',
    role: 'SHIPPER_RETAILER',
  },
  {
    title: 'Agregar Transporte',
    path: '/dashboard/shipRetailer_addShipment',
    icon: 'icon-park-solid:transporter',
    role: 'SHIPPER_RETAILER',
  },
  {
    title: 'Actualizar Perfil',
    path: '/dashboard/shipRetailer_updateUser',
    icon: 'carbon:user-profile',
    role: 'RETAILER',
  },
  {
    title: 'Agregar Retailer',
    path: '/dashboard/retailer_addRetailer',
    icon: 'fluent:building-shop-24-filled',
    role: 'RETAILER',
  },
  {
    title: 'Vista General',
    path: '/dashboard/admin',
    icon: 'fluent:building-shop-24-filled',
    role: 'ADMIN',
  },
  {
    title: 'Vista General',
    path: '/dashboard/farmer',
    icon: 'fluent:building-shop-24-filled',
    role: 'FARMER',
  },
  {
    title: 'Home',
    path: '/home',
    icon: 'eva:file-text-fill',
    role: 'ALL',
  },
  {
    title: 'Track',
    path: '/tracking',
    icon: 'eva:file-text-fill',
    role: 'ALL',
  },
];

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const userInfo = useSelector(userDataSelector);

  const [navOptions, setNavOptions] = useState([
    { title: 'Home', path: '/home', icon: 'eva:file-text-fill', role: 'all' },
  ]);
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  const getNavs = (role) => allOptionsNav.filter((item) => item.role === role || item.role === 'ALL');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    setNavOptions(getNavs(userInfo.role));
  }, [pathname, userInfo]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo urlLink="/dashboard" />
      </Box>

      {userInfo && (
        <Box sx={{ mb: 5, mx: 2.5 }}>
          <Link underline="none" component={RouterLink} to="#">
            <AccountStyle>
              <Avatar src={userInfo.profileHash} alt="photoURL" />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  {userInfo.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Rol: {userInfo.role}
                </Typography>
              </Box>
            </AccountStyle>
          </Link>
        </Box>
      )}

      <NavSection navConfig={navOptions} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.neutral',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
