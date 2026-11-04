import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

export default function DeleteUserDialog({ open, onCancel, onConfirmDelete }) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="delete-user-dialog-title"
      aria-describedby="delete-user-dialog-description"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="delete-user-dialog-title" disableTypography sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: theme => `${theme.palette.error.main}14`,
              color: 'error.main',
              flexShrink: 0
            }}
          >
            <WarningAmberRoundedIcon fontSize="small" />
          </Box>
          <Typography variant="h6" component="span">
            Delete user?
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-user-dialog-description">
          This will permanently remove the selected user and revoke their access to the portal.
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onCancel} color="inherit" autoFocus>
          Cancel
        </Button>
        <Button onClick={onConfirmDelete} variant="contained" color="error">
          Delete user
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteUserDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func,
  onConfirmDelete: PropTypes.func
};
