import { Container } from '@mui/material';
import { useSearchParams } from 'react-router-dom';


// components
import Page from '../components/Page';

import HarvestForm from '../components/AddHarvest/HarvestForm';

// ----------------------------------------------------------------------

export default function DashboardAddHarvest() {
  const [searchParams] = useSearchParams();
  const batchIN = searchParams.get('batch');

  return (
    <Page title="Farmer">
      <Container maxWidth="xl">
        <HarvestForm batchValue={!batchIN ? '': batchIN} />
      </Container>
    </Page>
  );
}
