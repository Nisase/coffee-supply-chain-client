// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
// components
import Page from '../components/Page';
import TimeLine from '../components/Tracking/TimeLine';
import InformativeTracking from '../components/Tracking/InformativeTracking';

// ----------------------------------------------------------------------


const ContentStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  // justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Tracking() {
  const [searchParams] = useSearchParams();
  const batch = searchParams.get('batch');

  // http://localhost:3000/tracking?batch=0x6B4964E34816C7FF32EA3787c2C615E583715197

  return (
    <Page title="Login">
          <ContentStyle
            className="w-full mt-0 p-0"
          >
            {batch && batch.length === 42 ? (
              <TimeLine batchNoIn={batch} />
            ) : (
              <>
                <InformativeTracking />
              </>
            )}
          </ContentStyle>
    </Page>
  );
}
