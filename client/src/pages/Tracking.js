// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import { useSearchParams } from "react-router-dom";
// components
import Page from '../components/Page';
import TimeLine from '../components/Tracking/TimeLine';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
  zIndex: 10
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
  const [searchParams] = useSearchParams();
  const batch = searchParams.get("batch");

  // http://localhost:3000/tracking?batch=0xd63f65EB4D5F6116BEa6A97f0D7433F8Db0B2b65

  return (
    <Page title="Login">
      <RootStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <TimeLine batchNoIn={batch} /> 
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
