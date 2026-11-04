import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from 'styles/makeStyles';
import { TableRow, TableCell, Typography, IconButton, Tooltip, Chip, Box } from '@mui/material';
import {
  BACKEND_PROPERTIES_USER_LAST_NAME,
  BACKEND_PROPERTIES_USER_FIRST_NAME,
  BACKEND_PROPERTIES_USER_LAST_LOGIN,
  NOTIFICATION_PERIODS_MAP
} from 'lib/constants';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { useSelector } from 'react-redux';
import { selectUserGroups } from 'selectors/user';
import { prop } from 'ramda';

function fullName(user) {
  const fullName = `${user[BACKEND_PROPERTIES_USER_FIRST_NAME]} ${user[BACKEND_PROPERTIES_USER_LAST_NAME]}`;
  return fullName.length == 1 ? '-' : fullName;
}

export function getUserStatusStr(user) {
  return user[BACKEND_PROPERTIES_USER_LAST_LOGIN] ? 'Accepted' : 'Invited';
}

const useStyles = makeStyles({
  actionIcon: {
    width: 20,
    height: 20
  },
  donorName: {
    minWidth: 250
  }
});

export default function UserRowItem({ user, showActions, isGaviDonor, onClickEdit, onClickDelete }) {
  const labelId = `user-${user.id}`;
  const classes = useStyles();
  const groups = useSelector(selectUserGroups);
  const periods = NOTIFICATION_PERIODS_MAP;
  const status = getUserStatusStr(user);

  return (
    <TableRow hover tabIndex={-1}>
      <TableCell component="th" id={labelId} className={classes.donorName} scope="row">
        <Typography variant="body2" fontWeight={500}>
          {fullName(user)}
        </Typography>
      </TableCell>
      <TableCell align="left">{user.user_email || '—'}</TableCell>
      <TableCell align="left">
        {isGaviDonor ? user.group_name : prop('name', groups.find(group => group.id === user.group))}
      </TableCell>
      <TableCell align="left">
        {prop('label', periods.find(period => period.name === user.notification_period))}
      </TableCell>
      <TableCell align="left">
        <Chip
          label={status}
          size="small"
          variant="outlined"
          color={status === 'Accepted' ? 'success' : 'warning'}
          sx={{ fontWeight: 600 }}
        />
      </TableCell>
      {showActions && (
        <TableCell align="left">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Tooltip title="Edit user">
              <IconButton
                color="primary"
                size="small"
                aria-label={`Edit ${fullName(user)}`}
                onClick={() => onClickEdit(user)}
              >
                <EditOutlinedIcon className={classes.actionIcon} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete user">
              <IconButton
                color="error"
                size="small"
                aria-label={`Delete ${fullName(user)}`}
                onClick={() => onClickDelete(user)}
              >
                <DeleteOutlinedIcon className={classes.actionIcon} />
              </IconButton>
            </Tooltip>
          </Box>
        </TableCell>
      )}
    </TableRow>
  );
}

UserRowItem.propTypes = {
  user: PropTypes.object,
  isGaviDonor: PropTypes.bool,
  showActions: PropTypes.bool,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func
};
