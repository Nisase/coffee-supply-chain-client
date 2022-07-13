import { Container } from '@mui/material';
// components
import Page from '../components/Page';

import WarehouseForm from '../components/AddWarehouse/WarehouseForm';

const DashboardAddWarehouse = () => {
  return (
    <Page title="Processor">
      <Container maxWidth="xl">
        <div className="mt-20">
          <WarehouseForm />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardAddWarehouse;
