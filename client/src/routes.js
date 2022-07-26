import { Navigate, useSearchParams } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Home from './pages/Home';
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import Tracking from './pages/Tracking';
import NotFound from './pages/Page404';
import Products from './pages/Products';
import DashboardAddUserAdmin from './pages/DashboardAddUserAdmin';
import DashboardApp from './pages/DashboardApp';
import Loading from './components/Loading';
import DashboardAddHarvest from './pages/DashboardAddHarvest';
import DashboardAddFarm from './pages/DashboardAddFarm';
import DashboardUpdateUser from './pages/DashboardUpdateUser';
import DashboardAddProcess from './pages/DashboardAddProcess';
import DashboardAddTasting from './pages/DashboardAddTasting';
import DashboardAddCoffeeSell from './pages/DashboardAddCoffeeSell';
import DashboardAddWarehouse from './pages/DashboardAddWarehouse';
import DashboardAddShipPacker from './pages/DashboardAddShipPacker';
import DashboardAddPacker from './pages/DashboardAddPacker';
import DashboardAddShipRetailer from './pages/DashboardAddShipRetailer';
import DashboardAddRetailer from './pages/DashboardAddRetailer';

import DashboardAdmin from './pages/DashboardAdmin';
import DashboardHarvest from './pages/DashboardHarvest';
import DashboardProcess from './pages/DashboardProcess';
import DashboardTaster from './pages/DashboardTaster';
import DashboardCoffeeSell from './pages/DashboardCoffeeSell';
import DashboardWarehouse from './pages/DashboardWarehouse';
import DashboardShipToPacker from './pages/DashboardShipToPacker';
import DashboardPacker from './pages/DashboardPacker';
import DashboardShipToRetailer from './pages/DashboardShipToRetailer';
import DashboardRetailer from './pages/DashboardRetailer';
// ----------------------------------------------------------------------


const goToPath = (userData, roleRequired, element)=> (userData && userData.role.findIndex((iRole) => iRole.key === roleRequired) !== -1) ? element : <Navigate to="/dashboard" />

const routes = (loading, userData, isOwner, batch) => {
  const route = loading
    ? [
        {
          path: '/',
          element: <LogoOnlyLayout />,
          children: [
            { path: '/', element: <Navigate to="/home" /> },
            { path: 'home', element: <Home /> },
            {
              path: 'login',
              element: userData ? (
                <Navigate to={batch ? `/dashboard?batch=${batch}` : `/dashboard`} />
              ) : (
                <Login to={batch ? `/login?batch=${batch}` : `/login`} />
              ),
            },
            { path: 'tracking', element: <Tracking /> },
          ],
        },
        { path: '*', element: <Loading /> },
      ]
    : [
        {
          path: '/dashboard',
          element: userData ? <DashboardLayout /> : <Navigate to={batch ? `/login?batch=${batch}` : `/login`} />,
          children: [
            // { path: '/', element: userData && userData.role === 'ADMIN' ? <DashboardAddUserAdmin /> : <></> },
            { path: 'App', element: <DashboardApp /> },
            { path: 'AddUsers', element: isOwner ? <DashboardAddUserAdmin /> : <Navigate to="/dashboard" /> },
            { path: 'AddFarm', element: isOwner ? <DashboardAddFarm /> : <Navigate to="/dashboard" /> },
            { path: 'UpdateUser', element: <DashboardUpdateUser /> },
            { path: 'AddHarvest', element: goToPath(userData, 'FARMER', <DashboardAddHarvest />) },
            { path: 'AddProcess', element: goToPath(userData, 'PROCESSOR', <DashboardAddProcess />)},
            { path: 'AddTasting', element: goToPath(userData, 'TASTER', <DashboardAddTasting />) },
            { path: 'AddCoffeeSelling', element: goToPath(userData, 'SELLER', <DashboardAddCoffeeSell />) },
            { path: 'AddWarehouse', element: goToPath(userData, 'WAREHOUSE', <DashboardAddWarehouse />) },
            { path: 'AddShippingToPacker', element: goToPath(userData, 'SHIPPER_PACKER', <DashboardAddShipPacker />) },
            { path: 'AddPackaging', element: goToPath(userData, 'PACKER', <DashboardAddPacker />) },
            { path: 'AddShippingToRetailer', element: goToPath(userData, 'SHIPPER_RETAILER', <DashboardAddShipRetailer />) },
            { path: 'AddRetailer', element: goToPath(userData, 'RETAILER', <DashboardAddRetailer />) },
            { path: 'Admin', element: isOwner ? <DashboardAdmin /> : <Navigate to="/dashboard" /> },
            { path: 'Farmer', element: goToPath(userData, 'FARMER', <DashboardHarvest />) },
            { path: 'Processor', element: goToPath(userData, 'PROCESSOR', <DashboardProcess />) },
            { path: 'Taster', element: goToPath(userData, 'TASTER', <DashboardTaster />) },
            { path: 'Seller', element: goToPath(userData, 'SELLER', <DashboardCoffeeSell />) },
            { path: 'Warehouse', element: goToPath(userData, 'WAREHOUSE', <DashboardWarehouse />) },
            { path: 'ShipperToPacker', element: goToPath(userData, 'SHIPPER_PACKER', <DashboardShipToPacker />) },
            { path: 'Packer', element: goToPath(userData, 'PACKER', <DashboardPacker />) },
            { path: 'ShipperToRetailer', element: goToPath(userData, 'SHIPPER_RETAILER', <DashboardShipToRetailer />) },
            { path: 'Retailer', element: goToPath(userData, 'RETAILER', <DashboardRetailer />) },
            { path: 'user', element: <User /> },
            { path: 'products', element: <Products /> },
            { path: 'blog', element: <Blog /> },
          ],
        },
        {
          path: '/',
          element: <LogoOnlyLayout />,
          children: [
            { path: '/', element: <Navigate to="/home" /> },
            { path: 'home', element: <Home /> },
            {
              path: 'login',
              element: userData ? (
                <Navigate to={batch ? `/dashboard?batch=${batch}` : `/dashboard`} />
              ) : (
                <Login to={batch ? `/login?batch=${batch}` : `/login`} />
              ),
            },
            { path: 'tracking', element: <Tracking /> },
            { path: '*', element: <NotFound /> },
          ],
        },
        { path: '*', element: <NotFound /> },
      ];

  return route;
};

export default routes;
