// @mui
import { styled } from '@mui/material/styles';
import { Card, Container, Typography } from '@mui/material';
import { useSearchParams } from "react-router-dom";
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
  zIndex: 10
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 600,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Tracking() {
  const mdUp = useResponsive('up', 'md');
  const [searchParams, setSearchParams] = useSearchParams();
  const batch = searchParams.get("batch");

  // http://localhost:3000/tracking?batch=0xgsjdhsfgsbddgbdfdhfjdhdfbksfjbdksb

  return (
    <Page title="Login">
      <RootStyle>
        <Container maxWidth="sm">
          <ContentStyle>
          {batch}  
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
