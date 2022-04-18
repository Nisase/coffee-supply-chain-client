import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
// components
import Logo from '../components/Logo';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  zIndex: 50,
  padding: "24px 20px"
}));

// ----------------------------------------------------------------------

export default function LogoOnlyLayout() {
  return (
    <>
      <HeaderStyle>
        <Logo />
      </HeaderStyle>
      <Outlet />
    </>
  );
}
