import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import PropTypes from 'prop-types'

function FeedBack ({stateProp, handleClose}){
  return(
    <>
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={stateProp.open}
      onClose={handleClose}
      key={stateProp.key}
      autoHideDuration={6000}
    >
      <MuiAlert onClose={stateProp.handleClose} severity={stateProp.status !== undefined ? stateProp.status : 'success'} sx={{ width: '100%' }}>
        {stateProp.message !== undefined ? stateProp.message : 'Transacción realizada'}
      </MuiAlert>
    </Snackbar>
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={false}
    >
      <div className='flex flex-col justify-center items-center'>
        <CircularProgress color="inherit" />
        <div className='mt-5 select-none'>{stateProp.messageLoading !== undefined ? stateProp.messageLoading : 'Esperando respuesta de Ethereum'}</div>
      </div>
    </Backdrop>
    <LinearProgress color="secondary" className={`mb-5${stateProp.openLoading?'':' hidden'}`}/>
  </>
  )
}

FeedBack.propTypes = {
  stateProp: PropTypes.object,
  handleClose: PropTypes.func,
}

export default FeedBack;
