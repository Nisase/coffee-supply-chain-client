import { Container } from '@mui/material';
// components
import Page from '../components/Page';

import ProcessForm from '../components/AddProcess/ProcessForm';

const DashboardAddProcess = () => {
  return (
    <Page title="Processor">
      <Container maxWidth="xl">
        {/* <UserAdminForm /> */}
        <div className="mt-20">
          <ProcessForm />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardAddProcess;
