import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import UserAdminForm from '../components/AddUserAdmin/UserAdminForm';

// ----------------------------------------------------------------------

export default function DashboardAddUserAdmin() {
  return (
    <Page title="Formulario Usuarios">
      <Container maxWidth="xl">
        <UserAdminForm />
      </Container>
    </Page>
  );
}
