import { Container } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

// components
import Page from '../components/Page';

import WarehouseForm from '../components/AddWarehouse/WarehouseForm';

const DashboardAddWarehouse = () => {
  const [searchParams] = useSearchParams();
  const batchIN = searchParams.get('batch');

  return (
    <Page title="Formulario Bodegaje">
      <Container maxWidth="xl">
        <div className="mt-20">
          <WarehouseForm batchValue={!batchIN ? '' : batchIN} />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardAddWarehouse;
