import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material
import { styled, useTheme } from '@mui/material/styles';
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
    role: 'AGRICULTOR/PRODUCTOR',
  },
  {
    title: 'Agregar Cosecha',
    path: '/dashboard/farmer_addHarvest',
    icon: 'healthicons:plantation-worker-alt',
    role: 'AGRICULTOR/PRODUCTOR',
  },
  {
    title: 'Actualizar Perfil',
    path: '/dashboard/processor_updateUser',
    icon: 'carbon:user-profile',
    role: 'PROCESADOR',
  },
  {
    title: 'Agregar Procesado',
    path: '/dashboard/processor_addProcess',
    icon: 'maki:watermill',
    role: 'PROCESADOR',
  },
  {
    title: 'Actualizar Perfil',
    path: '/dashboard/grainInspector_updateUser',
    icon: 'carbon:user-profile',
    role: 'INSPECTOR DE GRANO/AGRICULTOR',
  },
  {
    title: 'Agregar Grano',
    path: '/dashboard/grainInspector_addGrain',
    icon: 'arcticons:beanconqueror',
    role: 'INSPECTOR DE GRANO/AGRICULTOR',
  },
  {
    title: 'Actualizar Perfil',
    path: '/dashboard/agglomerator_updateUser',
    icon: 'carbon:user-profile',
    role: 'AGLOMERADOR',
  },
  {
    title: 'Agregar Aglomerado',
    path: '/dashboard/agglomerator_addAgglom',
    icon: 'bi:house-door',
    role: 'AGLOMERADOR',
  },
  {
    title: 'Actualizar Perfil',
    path: '/dashboard/shipPacker_updateUser',
    icon: 'carbon:user-profile',
    role: 'TRANSPORTISTA A EMPACADORA',
  },
  {
    title: 'Agregar Transporte',
    path: '/dashboard/shipPacker_addShipment',
    icon: 'icon-park-solid:transporter',
    role: 'TRANSPORTISTA A EMPACADORA',
  },
  {
    title: 'Actualizar Perfil',
    path: '/dashboard/packer_updateUser',
    icon: 'carbon:user-profile',
    role: 'EMPACADORA',
  },
  {
    title: 'Agregar Empacado',
    path: '/dashboard/packer_addPackage',
    icon: 'codicon:package',
    role: 'EMPACADORA',
  },
  {
    title: 'Actualizar Perfil',
    path: '/dashboard/shipRetailer_updateUser',
    icon: 'carbon:user-profile',
    role: 'TRANSPORTISTA A RETAILER',
  },
  {
    title: 'Agregar Transporte',
    path: '/dashboard/shipRetailer_addShipment',
    icon: 'icon-park-solid:transporter',
    role: 'TRANSPORTISTA A RETAILER',
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
    path: '/dashboard/Admin',
    icon: 'fluent:building-shop-24-filled',
    role: 'ADMIN',
  },
  {
    title: 'Vista General',
    path: '/dashboard/Farmer',
    icon: 'healthicons:plantation-worker-alt',
    role: 'AGRICULTOR/PRODUCTOR',
  },
  {
    title: 'Vista General',
    path: '/dashboard/Processor',
    icon: 'maki:watermill',
    role: 'PROCESADOR',
  },
  {
    title: 'Vista General',
    path: '/dashboard/Taster',
    icon: 'arcticons:beanconqueror',
    role: 'INSPECTOR DE GRANO/AGRICULTOR',
  },
  {
    title: 'Vista General',
    path: '/dashboard/Warehouse',
    icon: 'bi:house-door',
    role: 'AGLOMERADOR',
  },
  {
    title: 'Vista General',
    path: '/dashboard/ShipperToPacker',
    icon: 'icon-park-solid:transporter',
    role: 'TRANSPORTISTA A EMPACADORA',
  },
  {
    title: 'Vista General',
    path: '/dashboard/Packer',
    icon: 'codicon:package',
    role: 'EMPACADORA',
  },
  {
    title: 'Vista General',
    path: '/dashboard/ShipperToRetailer',
    icon: 'icon-park-solid:transporter',
    role: 'TRANSPORTISTA A RETAILER',
  },
  {
    title: 'Vista General',
    path: '/dashboard/Retailer',
    icon: 'fluent:building-shop-24-filled',
    role: 'RETAILER',
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
  const theme = useTheme();
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
                <Typography variant="subtitle2" sx={{ color: (theme) => theme.palette.grey[300] }}>
                  {userInfo.name}
                </Typography>
                <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[400] }}>
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
