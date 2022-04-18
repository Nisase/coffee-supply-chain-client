// @mui
import { styled } from '@mui/material/styles';
import { Card, Container, Typography } from '@mui/material';

import LoginMetamask from '../components/LoginMetamask';
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

export default function Login() {
  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Login">
      <RootStyle>
        {mdUp && (
          <SectionStyle>
            <img src="/static/images/login.jpg" alt="login" className='w-2/3 self-center'/>
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <img src="/static/illustrations/logistica_16.svg" alt="login" className='absolute w-2/3 self-center opacity-10'/>
            <Typography variant="h4" gutterBottom>
              Ingrese con su cuenta de Metamask
            </Typography>
            <LoginMetamask />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
