import { Container } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
// components
import Page from '../components/Page';

import ShipRetailerForm from '../components/AddShipRetailer/ShipRetailerForm';

const DashboardAddShipRetailer = () => {
  const [searchParams] = useSearchParams();
  const batchIN = searchParams.get('batch');

  return (
    <Page title="Formulario Transporte">
      <Container maxWidth="xl">
        <div className="mt-20">
          <ShipRetailerForm batchValue={!batchIN ? '' : batchIN} />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardAddShipRetailer;
