import { Container } from '@mui/material';
// components
import Page from '../components/Page';

import UpdateUserForm from '../components/UpdateUser/UpdateUserForm';

// ----------------------------------------------------------------------

export default function DashboardUpdateUser() {
  return (
    <Page title="Actualizar Usuario">
      <Container maxWidth="xl">
        <UpdateUserForm />
      </Container>
    </Page>
  );
}
