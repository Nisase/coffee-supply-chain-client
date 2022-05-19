import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import PropTypes from 'prop-types'

function FeedBack ({stateProp, onClose, }){
  
  return(
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={stateProp.showMessage}
      key={stateProp.key}
      onClose={onClose}
      autoHideDuration={6000}>
      <MuiAlert severity={stateProp.status !== undefined ? stateProp.status : 'success'} sx={{ width: '100%' }}>
        {stateProp.message !== undefined ? stateProp.message : 'Transacción Event'}
      </MuiAlert>
    </Snackbar>
  )
}

FeedBack.propTypes = {
  stateProp: PropTypes.object,
}

export default FeedBack;
