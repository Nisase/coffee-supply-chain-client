import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const FeedBack = ({feedBack}) => {
    return(
        <>
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            open={feedBack.open}
            onClose={feedBack.handleClose}
            key={feedBack.key}
            autoHideDuration={6000}
          >
            <MuiAlert onClose={feedBack.handleClose} severity={feedBack.status !== undefined ?  feedBack.status : 'success'} sx={{ width: '100%' }}>
              {feedBack.message !== undefined ?  feedBack.message : 'Transacción realizada'}
            </MuiAlert>
          </Snackbar>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={feedBack.openLoading}
          onClick={feedBack.handleCloseLoading}
        >
          <div className='flex flex-col justify-center items-center'>
          <CircularProgress color="inherit" />
          <div className='mt-5'>{feedBack.messageLoading !== undefined ?  feedBack.messageLoading : 'Esperando respuesta de Ethereum' }</div>
          </div>
        </Backdrop>
        </>
    );
};

export default FeedBack;
