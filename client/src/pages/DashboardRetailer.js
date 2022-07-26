import React from 'react';
import { Container } from '@mui/material';
import Page from '../components/Page';

import RetailerView from '../components/Users/RetailerView';

const DashboardRetailer = () => {
  return (
    <Page title="Tablero Retailer">
      <Container maxWidth="xl">
        <div className="mt-5">
          <RetailerView />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardRetailer;
