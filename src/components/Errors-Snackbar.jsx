import React, { useEffect, useState } from 'react';
import { pathOr } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import { makeStyles } from 'styles/makeStyles';
import { MySnackbarContentWrapper } from './Snackbars';
import { setError } from 'slices/error';
import { selectError } from 'selectors/ui-flags';

const useStyles2 = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function ErrorsSnackbar() {
  const classes = useStyles2();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const [errorMessage, setErrorMessage] = useState('');

  function buildErrorMessage(error) {
    let message = pathOr(`Error: ${error.message}`, ['response', 'data', 'detail'])(error);
    if (error.config) {
      message += `. Failure at url: ${error.config.url}`;
    }
    setErrorMessage(message);
  }
  useEffect(() => {
    if (error) {
      buildErrorMessage(error);
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [error]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(setError(null));
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={open}
      >
        <MySnackbarContentWrapper
          variant="error"
          onClose={handleClose}
          className={classes.margin}
          message={errorMessage}
        />
      </Snackbar>
    </div>
  );
}
