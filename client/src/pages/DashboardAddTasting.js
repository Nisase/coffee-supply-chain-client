import { Container } from '@mui/material';
// components
import Page from '../components/Page';

import TasterFormForm from '../components/AddTaster/TasterForm';

const DashboardAddTasting = () => {
  return (
    <Page title="GrainInspector">
      <Container maxWidth="xl">
        <div className="mt-20">
          <TasterFormForm />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardAddTasting;
