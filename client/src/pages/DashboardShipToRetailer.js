import React from 'react';
import { Container } from '@mui/material';
import Page from '../components/Page';

import ShipToRetailerView from '../components/Users/ShipToRetailerView';

const DashboardShipToRetailer = () => {
  return (
    <Page title="Tablero Transportista">
      <Container maxWidth="xl">
        <div className="mt-5">
          <ShipToRetailerView />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardShipToRetailer;
