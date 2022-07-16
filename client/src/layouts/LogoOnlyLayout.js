import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
// components
import Logo from '../components/Logo';
import NavHome from '../components/HomePage/NavHome';
import Home from '../components/HomePage/Home';

const linksArray = [{label: 'Inicio', url:'/home'}, {label: 'Dashboard', url:'/dashboard'}, {label: 'Tracking', url:'/tracking'}];

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  zIndex: 50,
  padding: '14px 20px',
  backgroundColor: theme.palette.primary.light,
}));

// ----------------------------------------------------------------------

export default function LogoOnlyLayout() {
  return (
    <>
      <HeaderStyle>
        {/* <Logo /> */}
        <NavHome links={linksArray} />
      </HeaderStyle>
      <Outlet />
    </>
  );
}
