import { Navigate } from 'react-router-dom';
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

// ----------------------------------------------------------------------

const routes = (loading, userData, isOwner) => {
  const route = loading
    ? [
        {
          path: '/',
          element: <LogoOnlyLayout />,
          children: [
            { path: '/', element: <Navigate to="/home" /> },
            { path: 'home', element: <Home /> },
            { path: 'login', element: userData ? <Navigate to="/dashboard" /> : <Login /> },
            { path: 'tracking', element: <Tracking /> },
          ],
        },
        { path: '*', element: <Loading /> },
      ]
    : [
        {
          path: '/dashboard',
          element: userData ? <DashboardLayout /> : <Navigate to="/login" />,
          children: [
            { path: 'app', element: <DashboardApp /> },
            { path: 'admin_addUsers', element: isOwner ? <DashboardAddUserAdmin /> : <Navigate to="/home" /> },
            { path: 'admin_addFarm', element: isOwner ? <DashboardAddFarm /> : <Navigate to="/home" /> },
            { path: 'farmer_updateUser', element: <DashboardUpdateUser /> },
            { path: 'farmer_addHarvest', element: <DashboardAddHarvest /> },
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
            { path: 'login', element: userData ? <Navigate to="/dashboard" /> : <Login /> },
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
