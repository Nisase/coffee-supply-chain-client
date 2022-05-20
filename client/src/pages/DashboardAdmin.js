import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import UserAdminForm from '../components/AddUserAdmin/UserAdminForm';

import FarmForm from '../components/AddFarmDetails/FarmForm';

// ----------------------------------------------------------------------

export default function DashboardAdmin() {
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <UserAdminForm />
        <FarmForm />
      </Container>
    </Page>
  );
}
