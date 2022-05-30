import { Container } from '@mui/material';
// components
import Page from '../components/Page';

import ShipRetailerForm from '../components/AddShipRetailer/ShipRetailerForm';

const DashboardAddShipRetailer = () => {
  return (
    <Page title="ShipperRetailer">
      <Container maxWidth="xl">
        <div className="mt-20">
          <ShipRetailerForm />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardAddShipRetailer;
