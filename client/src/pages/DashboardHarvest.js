import React from 'react';
import { Container } from '@mui/material';
import Page from '../components/Page';

import TableHarvest from '../components/Users/TableHarvest';

const DashboardHarvest = () => {
  return (
    <Page title="TableHarvest">
      <Container maxWidth="xl">
        <div className="mt-5">
          <TableHarvest />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardHarvest;
