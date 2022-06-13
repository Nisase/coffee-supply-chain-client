import React from 'react';
import { Container } from '@mui/material';
import Page from '../components/Page';

import TableAdmin from '../components/Admin/TableAdmin';

const DashboardAdmin = () => {
  return (
    <Page title="TableAdmin">
      <Container maxWidth="xl">
        <div className="mt-20">
          <TableAdmin />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardAdmin;
