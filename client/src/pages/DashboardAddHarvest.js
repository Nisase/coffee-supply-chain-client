import { Container } from '@mui/material';
// components
import Page from '../components/Page';

import HarvestForm from '../components/AddHarvest/HarvestForm';

// ----------------------------------------------------------------------

export default function DashboardAddHarvest() {
  return (
    <Page title="Farmer">
      <Container maxWidth="xl">
        <HarvestForm />
      </Container>
    </Page>
  );
}
