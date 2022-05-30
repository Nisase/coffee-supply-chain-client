import { Container } from '@mui/material';
// components
import Page from '../components/Page';

import GrainInspectionForm from '../components/AddGrainInspection/GrainInspectionForm';

const DashboardAddGrain = () => {
  return (
    <Page title="GrainInspector">
      <Container maxWidth="xl">
        <div className="mt-20">
          <GrainInspectionForm />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardAddGrain;
