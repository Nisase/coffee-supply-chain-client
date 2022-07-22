import { Container } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

// components
import Page from '../components/Page';

import PackerForm from '../components/AddPacker/PackerForm';

const DashboardAddPacker = () => {
  const [searchParams] = useSearchParams();
  const batchIN = searchParams.get('batch');

  return (
    <Page title="Packer">
      <Container maxWidth="xl">
        <div className="mt-20">
          <PackerForm batchValue={!batchIN ? '' : batchIN} />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardAddPacker;
