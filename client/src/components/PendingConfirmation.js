import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function PendingConfirmation({loading, message='Esperando confirmación desde Metamask'}){
    return(
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <div className='flex flex-col justify-center items-center'>
          <CircularProgress color="inherit" />
          <div className='mt-5 select-none'>{message}</div>
        </div>
      </Backdrop>
    )
}

export default PendingConfirmation;