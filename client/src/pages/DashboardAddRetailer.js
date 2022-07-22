import { Container } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
// components
import Page from '../components/Page';

import RetailerForm from '../components/AddRetailer/RetailerForm';

const DashboardAddRetailer = () => {
  const [searchParams] = useSearchParams();
  const batchIN = searchParams.get('batch');

  return (
    <Page title="Processor">
      <Container maxWidth="xl">
        <div className="mt-20">
          <RetailerForm batchValue={!batchIN ? '' : batchIN} />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardAddRetailer;
