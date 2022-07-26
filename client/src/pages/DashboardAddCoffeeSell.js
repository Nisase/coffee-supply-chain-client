import { Container } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
// components
import Page from '../components/Page';

import CoffeeSellForm from '../components/AddCoffeeSell/CoffeeSellForm';

const DashboardAddCoffeeSell = () => {
  const [searchParams] = useSearchParams();
  const batchIN = searchParams.get('batch');

  return (
    <Page title="Formulario Venta de Café">
      <Container maxWidth="xl">
        <div className="mt-20">
          <CoffeeSellForm batchValue={!batchIN ? '' : batchIN} />
        </div>
      </Container>
    </Page>
  );
};

export default DashboardAddCoffeeSell;
