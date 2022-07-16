import React from 'react';
import { Container } from '@mui/material';
import Page from '../components/Page';

import CoffeeSellView from '../components/Users/CoffeeSellView';

const DashboardCoffeeSell = () => {
  return (
    <Page title="TableCoffeeSell">
      <Container maxWidth="xl">
        <div className="mt-5">
          <CoffeeSellView />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardCoffeeSell;
