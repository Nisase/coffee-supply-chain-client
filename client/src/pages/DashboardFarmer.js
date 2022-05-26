import { Container } from '@mui/material';
// components
import Page from '../components/Page';

import FarmForm from '../components/AddFarmDetails/FarmForm';

// ----------------------------------------------------------------------

export default function DashboardFarmer() {
  return (
    <Page title="Farmer">
      <Container maxWidth="xl">
        <FarmForm />
      </Container>
    </Page>
  );
}
