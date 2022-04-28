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
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardApp from './pages/DashboardApp';
import Loading from './components/Loading'

// ----------------------------------------------------------------------

const routes = (loading, walletAddress, error, userInfo, isOwner, message) => {
  const isLoggedIn = walletAddress !==null && error === null;



  const route = loading ? [{
    path: '/',
    element: <LogoOnlyLayout />,
    children: [
      { path: '/', element: <Navigate to="/home" /> },
      { path: 'home', element: <Home walletAddress={walletAddress}/> },
      { path: 'login', element: !isLoggedIn ? <Login /> : <Navigate to="/dashboard/app" /> },
      { path: 'tracking', element:  <Tracking />}
    ],
  }, { path: '*', element:  <Loading />}]: [
  {
    path: '/dashboard',
    element: isLoggedIn ? <DashboardLayout userInfo={userInfo} isOwner={isOwner} walletAddress={walletAddress}/> : <Navigate to="/login" />,
    children: [
      { path: 'app', element: <DashboardApp /> },
      { path: 'admin', element: isOwner ? <DashboardAdmin walletAddress={walletAddress} />: <Navigate to="/dashboard/app" />  },
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
      { path: 'home', element: <Home walletAddress={walletAddress}/> },
      { path: 'login', element: !isLoggedIn ? <Login /> : <Navigate to="/dashboard/app" /> },
      { path: 'tracking', element:  <Tracking />},
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  { path: '*', element: <Navigate to="/404" replace /> },
]

return route;

};

export default routes;
