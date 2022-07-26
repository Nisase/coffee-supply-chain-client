import React from 'react';
import { Container } from '@mui/material';
import Page from '../components/Page';

import TableHarvest from '../components/Users/TableHarvest';
import HarvestView from '../components/Users/HarvestView';

const DashboardHarvest = () => {
  return (
    <Page title="Tablero Agricultor">
      <Container maxWidth="xl">
        <div className="mt-5">
          {/* <TableHarvest /> */}
          <HarvestView />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardHarvest;
