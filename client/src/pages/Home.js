// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';
import HomeSection from '../components/HomePage/Home';
import InformativeSection from '../components/HomePage/InformativeSection';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
  zIndex: 0,
}));

const BoxStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: -80,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: '0px 0px',
  maxHeight: '30%',
  margin: theme.spacing(0, 0),
}));

// ----------------------------------------------------------------------

export default function Home() {

  return (
    <Page title="Login">
      <RootStyle sx={{ margin: 0 }}>
        <BoxStyle sx={{ margin: 10 }}>
          <HomeSection />
          <InformativeSection />
        </BoxStyle>
      </RootStyle>
    </Page>
  );
}
