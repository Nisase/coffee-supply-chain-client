import { Container } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

// components
import Page from '../components/Page';

import ProcessForm from '../components/AddProcess/ProcessForm';

const DashboardAddProcess = () => {
  const [searchParams] = useSearchParams();
  const batchIN = searchParams.get('batch');

  return (
    <Page title="Processor">
      <Container maxWidth="xl">
        {/* <UserAdminForm /> */}
        <div className="mt-20">
          <ProcessForm batchValue={!batchIN ? '': batchIN} />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardAddProcess;
