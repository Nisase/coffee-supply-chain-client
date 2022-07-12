import React from 'react';
import { Container } from '@mui/material';
import Page from '../components/Page';

import PackerView from '../components/Users/PackerView';

const DashboardPacker = () => {
  return (
    <Page title="TableHarvest">
      <Container maxWidth="xl">
        <div className="mt-5">
          <PackerView />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardPacker;
