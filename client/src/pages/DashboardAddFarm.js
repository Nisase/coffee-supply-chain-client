import { Container } from '@mui/material';
// components
import Page from '../components/Page';

import FarmForm from '../components/AddFarmDetails/FarmForm';

// ----------------------------------------------------------------------

export default function DashboardAdmin() {
  return (
    <Page title="Formulario Granja">
      <Container maxWidth="xl">
        {/* <UserAdminForm /> */}
        <div className="mt-20">
          <FarmForm />
        </div>
      </Container>
    </Page>
  );
}
