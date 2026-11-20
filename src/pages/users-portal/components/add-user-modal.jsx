import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { prop, propOr } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DialogTitle from '@mui/material/DialogTitle';
import {
  TextField,
  Typography,
  Box,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  CircularProgress
} from '@mui/material';
import { setValueFromEvent, oneIsEmpty } from 'lib/helpers';
import { makeStyles } from 'styles/makeStyles';
import { FORM_CONFIG } from '../../../lib/constants';
import { NOTIFICATION_PERIODS_MAP } from '../../../lib/constants';
import { selectDonorUserGroups } from 'selectors/user';
import { selectCreatedRole, selectFormError } from 'selectors/ui-flags';
import { onCreateUserRole } from 'actions';
import { getErrorState } from 'lib/error-parsers';
import { onResetFormError, onFormError } from 'slices/form-error';
import { userRoleEdited } from 'actions';

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    color: 'white',
    background: `linear-gradient(100deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
    padding: theme.spacing(2, 3)
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.25)
  },
  titleIcon: {
    opacity: 0.9
  },
  closeButton: {
    color: '#FFFFFF',
    width: 32,
    height: 32,
    padding: 0
  },
  contentHeader: {
    backgroundColor: theme.palette.primary.main + '0F',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 10,
    padding: theme.spacing(1.5, 2),
    marginBottom: theme.spacing(2.5)
  },
  error: {
    color: theme.palette.error.main
  }
}));

export default function AddUserModal({ open, onClose, userProp = {} }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [isEditMode, setEditMode] = useState(false);
  const [user, setUser] = useState({});
  const [period, setPeriod] = useState('every_day');

  const createdRole = useSelector(selectCreatedRole);
  const groups = useSelector(selectDonorUserGroups);
  const formError = useSelector(selectFormError);

  function resetForm() {
    setEmail('');
    setFirstName('');
    setLastName('');
    setRole('');
    setPeriod('every_day')
    setEditMode(false);
    setUser({});
  }

  function handleErrorState(modelName, stateProp) {
    return () => {
      if (stateProp.length && propOr(null, [modelName], formError)) {
        dispatch(
          onFormError({
            ...formError,
            [modelName]: undefined
          })
        );
      }
    };
  }

  async function onSubmit() {
    dispatch(onFormError(null));

    const user = {
      username: email,
      first_name: firstName,
      last_name: lastName,
      email
    };

    const rolePayload = {
      group: prop('id', groups.find(g => g.name === role))
    };

    const periodPayload = {
      notification_period: period
    }

    setLoading(true);
    dispatch(onCreateUserRole({ user, rolePayload, periodPayload }));
  }

  async function onEditSubmit() {
    const roleId = prop('id', groups.find(g => g.name === role));
    const payload = {
      id: userProp.id,
      group: roleId,
      notification_period: period
    };
    dispatch(userRoleEdited(payload));
  }

  useEffect(() => {
    if (formError) {
      setLoading(false);
    }
  }, [formError]);

  useEffect(() => {
    setLoading(false);
    onClose();
  }, [createdRole]);

  useEffect(() => {
    if (!open) {
      resetForm();
      dispatch(onResetFormError());
    }
  }, [open]);

  useEffect(() => {
    setUser(userProp);
  })

  // check if user object is populated, set state with user data
  useEffect(() => {
    if (Object.entries(user).length > 0) {
      setEditMode(true)
      setEmail(user.user_email);
      setFirstName(user.user_first_name);
      setLastName(user.user_last_name);
      setRole(user.group_name);
      setPeriod(user.notification_period);
    }
  }, [user])

  const stopPropagationForTab = event => {
    if (event.key === 'Tab') {
      event.stopPropagation();
    }
  };

  const btnContent =
    (loading && <CircularProgress size={20} color="inherit" />) ||
    (isEditMode ? 'Save changes' : 'Send invitation');
  const onSubmitDisabled = oneIsEmpty(email, firstName, lastName, role);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      onKeyDown={stopPropagationForTab}
      aria-labelledby="add-user-dialog"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="add-user-dialog" className={classes.dialogTitle} disableTypography>
        <Box className={classes.titleRow}>
          {isEditMode ? (
            <EditOutlinedIcon className={classes.titleIcon} />
          ) : (
            <PersonAddAlt1OutlinedIcon className={classes.titleIcon} />
          )}
          <Typography variant="h6" color="inherit" sx={{ flex: 1 }}>
            {isEditMode ? 'Edit user role' : 'Add new user'}
          </Typography>
          <IconButton className={classes.closeButton} onClick={onClose} aria-label="Close dialog">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {!isEditMode && (
          <Box className={classes.contentHeader}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Invitation email
            </Typography>
            <Typography variant="body2" color="text.secondary">
              An email with an invitation will be sent to the address provided below.
            </Typography>
          </Box>
        )}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              type="email"
              value={email}
              error={getErrorState(formError, 'email')}
              onBlur={handleErrorState('email', email)}
              onChange={setValueFromEvent(setEmail)}
              disabled={isEditMode}
            />
            {getErrorState(formError, 'email') && (
              <FormHelperText className={classes.error}>{formError['email']}</FormHelperText>
            )}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              required
              fullWidth
              id="first-name"
              label="First Name"
              value={firstName}
              onBlur={handleErrorState('first_name', firstName)}
              error={getErrorState(formError, 'first_name')}
              onChange={setValueFromEvent(setFirstName)}
              disabled={isEditMode}
            />
            {getErrorState(formError, 'first_name') && (
              <FormHelperText className={classes.error}>{formError['first_name']}</FormHelperText>
            )}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              required
              fullWidth
              id="last-name"
              label="Last Name"
              value={lastName}
              onBlur={handleErrorState('last_name', lastName)}
              error={getErrorState(formError, 'last_name')}
              onChange={setValueFromEvent(setLastName)}
              disabled={isEditMode}
            />
            {getErrorState(formError, 'last_name') && (
              <FormHelperText className={classes.error}>{formError['last_name']}</FormHelperText>
            )}
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth required>
              <InputLabel htmlFor="role">{FORM_CONFIG.role.label}</InputLabel>
              <Select
                value={role}
                onBlur={handleErrorState('group', role)}
                error={getErrorState(formError, 'group')}
                onChange={setValueFromEvent(setRole)}
                inputProps={{
                  name: 'select-role',
                  id: 'role'
                }}
              >
                {groups.map(group => (
                  <MenuItem key={group.id} value={group.name}>
                    {group.name}
                  </MenuItem>
                ))}
              </Select>
              {getErrorState(formError, 'group') && (
                <FormHelperText className={classes.error}>{formError['group']}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth required>
              <InputLabel htmlFor="period">{FORM_CONFIG.periods.label}</InputLabel>
              <Select
                value={period}
                onBlur={handleErrorState('period', period)}
                error={getErrorState(formError, 'period')}
                onChange={setValueFromEvent(setPeriod)}
                inputProps={{
                  name: 'select-period',
                  id: 'period'
                }}
              >
                {NOTIFICATION_PERIODS_MAP.map(period => (
                  <MenuItem key={period.id} value={period.name}>
                    {period.label}
                  </MenuItem>
                ))}
              </Select>
              {getErrorState(formError, 'period') && (
                <FormHelperText className={classes.error}>{formError['period']}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
        {getErrorState(formError, 'non_field_errors') && (
          <FormHelperText error sx={{ mt: 2 }}>
            The email and role selected must be a unique combination. Change either the email or the
            user role.
          </FormHelperText>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit" disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={isEditMode ? onEditSubmit : onSubmit}
          variant="contained"
          color="primary"
          disabled={onSubmitDisabled || loading}
          autoFocus
        >
          {btnContent}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userProp: PropTypes.object
};
