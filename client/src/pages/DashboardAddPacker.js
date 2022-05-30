import { Container } from '@mui/material';
// components
import Page from '../components/Page';

import PackerForm from '../components/AddPacker/PackerForm';

const DashboardAddPacker = () => {
  return (
    <Page title="Packer">
      <Container maxWidth="xl">
        <div className="mt-20">
          <PackerForm />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardAddPacker;
