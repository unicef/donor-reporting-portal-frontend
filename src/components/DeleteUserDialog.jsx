import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from 'styles/makeStyles';

const useStyles = makeStyles(({
  warning: {
    color: 'red'
  }
}));

export default function DeleteUserDialog({open, onCancel, onConfirmDelete}) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={open}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete selected user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary" autoFocus>
            Cancel
          </Button>
          <Button onClick={onConfirmDelete} className={classes.warning}>
            Delete User
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DeleteUserDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func,
  onConfirmDelete: PropTypes.func
};