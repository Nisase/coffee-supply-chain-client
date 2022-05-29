// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { walletAddressSelector } from '../redux/appDataSlice'
// components
import Page from '../components/Page';

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

export default function Home() {

  const walletAddress = useSelector(walletAddressSelector)

  return (
    <Page title="Login">
      <RootStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <div className='flex flex-col justify-center items-center'>
              <h1 className='text-center'>TITLE</h1>
              <img src="/static/images/login.jpg" alt="login" className='w-2/3 self-center my-10'/>
              {walletAddress === '0x' && <RouterLink to="/login"><p className='font-bold uppercase my-5'>login -></p></RouterLink>}
              <RouterLink to="/dashboard"><p className='font-bold uppercase my-5'>dashboard -></p></RouterLink>
              <p className='my-10'>loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren </p>
              <img src="/static/images/login.jpg" alt="login" className='w-2/3 self-center my-10'/>
              <p className='my-2'>loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren </p>
              <img src="/static/images/login.jpg" alt="login" className='w-2/3 self-center my-10'/>
              <p className='my-2'>loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren </p>
            </div>            
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
