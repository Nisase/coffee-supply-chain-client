import React from 'react';
import { Container } from '@mui/material';
import Page from '../components/Page';

import ShipToPackerView from '../components/Users/ShipToPackerView';

const DashboardShipToPacker = () => {
  return (
    <Page title="Tablero Transportista">
      <Container maxWidth="xl">
        <div className="mt-5">
          <ShipToPackerView />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardShipToPacker;
