import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import { makeStyles } from 'styles/makeStyles';
import { MySnackbarContentWrapper } from './Snackbars';
import { successCleared } from 'slices/success';
import { selectSuccess } from 'selectors/ui-flags';

const useStyles2 = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function SuccessSnackbar() {
  const classes = useStyles2();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const successMessage = useSelector(selectSuccess);

  useEffect(() => {
    if (successMessage) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [successMessage]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(successCleared());
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={open}
        autoHideDuration={3000}
      >
        <MySnackbarContentWrapper
          variant="success"
          onClose={handleClose}
          className={classes.margin}
          message={successMessage}
        />
      </Snackbar>
    </div>
  );
}
