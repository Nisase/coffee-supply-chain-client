import { Container } from '@mui/material';
// components
import Page from '../components/Page';

import AgglomForm from '../components/AddAgglom/AgglomForm';

const DashboardAddAgglom = () => {
  return (
    <Page title="Processor">
      <Container maxWidth="xl">
        <div className="mt-20">
          <AgglomForm />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardAddAgglom;
