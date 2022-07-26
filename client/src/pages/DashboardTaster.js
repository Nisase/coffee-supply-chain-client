import React from 'react';
import { Container } from '@mui/material';
import Page from '../components/Page';

import TasterView from '../components/Users/TasteView';

const DashboardTaster = () => {
  return (
    <Page title="Tablero Catador">
      <Container maxWidth="xl">
        <div className="mt-5">
          <TasterView />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardTaster;
