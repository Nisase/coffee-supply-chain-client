import { Container } from '@mui/material';
// components
import Page from '../components/Page';

import RetailerForm from '../components/AddRetailer/RetailerForm';

const DashboardAddRetailer = () => {
  return (
    <Page title="Processor">
      <Container maxWidth="xl">
        <div className="mt-20">
          <RetailerForm />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardAddRetailer;
