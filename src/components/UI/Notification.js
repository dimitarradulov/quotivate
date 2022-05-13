import * as React from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { quoteActions } from '../../store/quote-slice';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = () => {
  const notification = useSelector((state) => state.quote.notification);
  const notificationAlertOpen = useSelector(
    (state) => state.quote.notificationAlertOpen
  );
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(quoteActions.notificationAlertToggler({ type: 'close' }));
  };

  let alert;

  if (notification.status === 'pending') {
    alert = (
      <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
        {notification.message}
      </Alert>
    );
  }

  if (notification.status === 'success') {
    alert = (
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {notification.message}
      </Alert>
    );
  }

  if (notification.status === 'error') {
    alert = (
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {notification.message}
      </Alert>
    );
  }

  return ReactDOM.createPortal(
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={notificationAlertOpen}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      {alert}
    </Snackbar>,
    document.getElementById('notification-root')
  );
};

export default Notification;
