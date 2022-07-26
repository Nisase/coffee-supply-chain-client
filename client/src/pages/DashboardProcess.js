import React from 'react';
import { Container } from '@mui/material';
import Page from '../components/Page';

import ProcessView from '../components/Users/ProcessView';

const DashboardProcess = () => {
  return (
    <Page title="Tablero Procesador">
      <Container maxWidth="xl">
        <div className="mt-5">
          <ProcessView />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardProcess;
