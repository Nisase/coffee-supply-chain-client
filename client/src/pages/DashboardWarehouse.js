import React from 'react';
import { Container } from '@mui/material';
import Page from '../components/Page';

import WarehouseView from '../components/Users/WarehouseView';

const DashboardWarehouse = () => {
  return (
    <Page title="Tablero Bodega">
      <Container maxWidth="xl">
        <div className="mt-5">
          <WarehouseView />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardWarehouse;
