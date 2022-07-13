import { Container } from '@mui/material';
// components
import Page from '../components/Page';

import CoffeeSellForm from '../components/AddCoffeeSell/CoffeeSellForm';

const DashboardAddCoffeeSell = () => {
  return (
    <Page title="GrainInspector">
      <Container maxWidth="xl">
        <div className="mt-20">
          <CoffeeSellForm />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardAddCoffeeSell;
