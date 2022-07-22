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
            { path: 'AddUsers', element: isOwner ? <DashboardAddUserAdmin /> : <Navigate to="/home" /> },
            { path: 'AddFarm', element: isOwner ? <DashboardAddFarm /> : <Navigate to="/home" /> },
            { path: 'UpdateUser', element: <DashboardUpdateUser /> },
            { path: 'AddHarvest', element: <DashboardAddHarvest /> },
            { path: 'AddProcess', element: <DashboardAddProcess /> },
            { path: 'AddTasting', element: <DashboardAddTasting /> },
            { path: 'AddCoffeeSelling', element: <DashboardAddCoffeeSell /> },
            { path: 'AddWarehouse', element: <DashboardAddWarehouse /> },
            { path: 'AddShippingToPacker', element: <DashboardAddShipPacker /> },
            { path: 'AddPackaging', element: <DashboardAddPacker /> },
            { path: 'AddShippingToRetailer', element: <DashboardAddShipRetailer /> },
            { path: 'AddRetailer', element: <DashboardAddRetailer /> },
            { path: 'Admin', element: <DashboardAdmin /> },
            { path: 'Farmer', element: <DashboardHarvest /> },
            { path: 'Processor', element: <DashboardProcess /> },
            { path: 'Taster', element: <DashboardTaster /> },
            { path: 'Seller', element: <DashboardCoffeeSell /> },
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
            { path: '*', element: <NotFound /> },
          ],
        },
        { path: '*', element: <NotFound /> },
      ];

  return route;
};

export default routes;
