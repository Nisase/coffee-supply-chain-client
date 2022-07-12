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
import DashboardAddGrain from './pages/DashboardAddGrain';
import DashboardAddAgglom from './pages/DashboardAddAgglom';
import DashboardAddShipPacker from './pages/DashboardAddShipPacker';
import DashboardAddPacker from './pages/DashboardAddPacker';
import DashboardAddShipRetailer from './pages/DashboardAddShipRetailer';
import DashboardAddRetailer from './pages/DashboardAddRetailer';

import DashboardAdmin from './pages/DashboardAdmin';
import DashboardHarvest from './pages/DashboardHarvest';
import DashboardProcess from './pages/DashboardProcess';
import DashboardTaster from './pages/DashboardTaster';
import DashboardWarehouse from './pages/DashboardWarehouse';
import DashboardShipToPacker from './pages/DashboardShipToPacker';
import DashboardPacker from './pages/DashboardPacker';
import DashboardShipToRetailer from './pages/DashboardShipToRetailer';
import DashboardRetailer from './pages/DashboardRetailer';
// ----------------------------------------------------------------------

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
            { path: 'app', element: <DashboardApp /> },
            { path: 'admin_addUsers', element: isOwner ? <DashboardAddUserAdmin /> : <Navigate to="/home" /> },
            { path: 'admin_addFarm', element: isOwner ? <DashboardAddFarm /> : <Navigate to="/home" /> },
            { path: 'farmer_updateUser', element: <DashboardUpdateUser /> },
            { path: 'farmer_addHarvest', element: <DashboardAddHarvest /> },
            { path: 'processor_updateUser', element: <DashboardUpdateUser /> },
            { path: 'processor_addProcess', element: <DashboardAddProcess /> },
            { path: 'grainInspector_updateUser', element: <DashboardUpdateUser /> },
            { path: 'grainInspector_addGrain', element: <DashboardAddGrain /> },
            { path: 'agglomerator_updateUser', element: <DashboardUpdateUser /> },
            { path: 'agglomerator_addAgglom', element: <DashboardAddAgglom /> },
            { path: 'shipPacker_updateUser', element: <DashboardUpdateUser /> },
            { path: 'shipPacker_addShipment', element: <DashboardAddShipPacker /> },
            { path: 'packer_updateUser', element: <DashboardUpdateUser /> },
            { path: 'packer_addPackage', element: <DashboardAddPacker /> },
            { path: 'shipRetailer_updateUser', element: <DashboardUpdateUser /> },
            { path: 'shipRetailer_addShipment', element: <DashboardAddShipRetailer /> },
            { path: 'retailer_updateUser', element: <DashboardUpdateUser /> },
            { path: 'retailer_addRetailer', element: <DashboardAddRetailer /> },
            { path: 'Admin', element: <DashboardAdmin /> },
            { path: 'Farmer', element: <DashboardHarvest /> },
            { path: 'Processor', element: <DashboardProcess /> },
            { path: 'Taster', element: <DashboardTaster /> },
            { path: 'Warehouse', element: <DashboardWarehouse /> },
            { path: 'ShipperToPacker', element: <DashboardShipToPacker /> },
            { path: 'Packer', element: <DashboardPacker /> },
            { path: 'ShipperToRetailer', element: <DashboardShipToRetailer /> },
            { path: 'Retailer', element: <DashboardRetailer /> },
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
            { path: '404', element: <NotFound /> },
            { path: '*', element: <Navigate to="/404" /> },
          ],
        },
        { path: '*', element: <Navigate to="/404" replace /> },
      ];

  return route;
};

export default routes;
