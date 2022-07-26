import { Container } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
// components
import Page from '../components/Page';

import TasterFormForm from '../components/AddTaster/TasterForm';

const DashboardAddTasting = () => {
  const [searchParams] = useSearchParams();
  const batchIN = searchParams.get('batch');

  return (
    <Page title="Formulario Catación">
      <Container maxWidth="xl">
        <div className="mt-20">
          <TasterFormForm batchValue={!batchIN ? '' : batchIN} />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardAddTasting;
