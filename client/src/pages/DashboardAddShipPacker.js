import { Container } from '@mui/material';
// components
import Page from '../components/Page';

import ShipPackerForm from '../components/AddShipPacker/ShipPackerForm';

const DashboardAddShipPacker = () => {
  return (
    <Page title="ShipperPacker">
      <Container maxWidth="xl">
        <div className="mt-20">
          <ShipPackerForm />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardAddShipPacker;
