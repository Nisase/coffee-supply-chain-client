import { useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import { walletAddressSelector, userDataSelector } from '../redux/appDataSlice';
// components
import Page from '../components/Page';
import UserAdminForm from '../components/AddUserAdmin/UserAdminForm'

// ----------------------------------------------------------------------

export default function DashboardAdmin() {
  const userInfo = useSelector(userDataSelector)
  

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }} align="center">
          Bienvenido: {userInfo.name}
        </Typography>
        <UserAdminForm />
      </Container>
    </Page>
  );
}
