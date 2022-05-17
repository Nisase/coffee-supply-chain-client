import { Container} from '@mui/material';
// components
import Page from '../components/Page';
import UserAdminForm from '../components/AddUserAdmin/UserAdminForm'

// ----------------------------------------------------------------------

export default function DashboardAdmin() {

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <UserAdminForm />
      </Container>
    </Page>
  );
}
