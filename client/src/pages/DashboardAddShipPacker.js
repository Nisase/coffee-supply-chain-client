import { Container } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

// components
import Page from '../components/Page';

import ShipPackerForm from '../components/AddShipPacker/ShipPackerForm';

const DashboardAddShipPacker = () => {
  const [searchParams] = useSearchParams();
  const batchIN = searchParams.get('batch');

  return (
    <Page title="Formulario Empacado">
      <Container maxWidth="xl">
        <div className="mt-20">
          <ShipPackerForm batchValue={!batchIN ? '' : batchIN} />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardAddShipPacker;
