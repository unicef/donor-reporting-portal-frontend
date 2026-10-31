import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from 'styles/makeStyles';
import { TableRow, TableCell, Typography, IconButton, Tooltip } from '@mui/material';
import {
  BACKEND_PROPERTIES_USER_LAST_NAME,
  BACKEND_PROPERTIES_USER_FIRST_NAME,
  BACKEND_PROPERTIES_USER_LAST_LOGIN,
  NOTIFICATION_PERIODS_MAP
} from 'lib/constants';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import clsx from 'clsx';
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

const useStyles = makeStyles(theme => ({
  hide: {
    visibility: 'hidden'
  },
  icon: {
    width: 32,
    height: 32
  },
  actionIcon: {
    width: 20,
    height: 20
  },
  iconMargin: {
    marginLeft: theme.spacing(1)
  },
  donorName: {
    minWidth: 250
  }
}));

export default function UserRowItem({user, showActions, isGaviDonor, onClickEdit, onClickDelete }) {
  const labelId = `user-${user.id}`;
  const classes = useStyles();
  const groups = useSelector(selectUserGroups);
  const periods = NOTIFICATION_PERIODS_MAP;

  return (
    <TableRow hover tabIndex={-1}>
      <TableCell component="th" id={labelId} className={classes.donorName} scope="row">
        <Typography>{fullName(user)}</Typography>
      </TableCell>
      <TableCell align="left">{user.user_email || '-'}</TableCell>
      <TableCell align="left">
        {isGaviDonor ? user.group_name : prop('name', groups.find(group => group.id === user.group))}
      </TableCell>
      <TableCell align="left">
        {prop('label', periods.find(period => period.name === user.notification_period))}
      </TableCell>
      <TableCell align="left">{getUserStatusStr(user)}</TableCell>
      {showActions && (
        <TableCell align="left">
          <IconButton
            color="primary"
            className={clsx(classes.icon, classes.iconMargin)}
            size="small"
            onClick={() => onClickEdit(user)}
          >
            <Tooltip title="Edit" placement="top">
              <EditIcon className={classes.actionIcon} />
            </Tooltip>
          </IconButton>
          <IconButton
            color="primary"
            className={clsx(classes.icon, classes.iconMargin)}
            size="small"
            onClick={() => onClickDelete(user)}
          >
            <Tooltip title="Delete" placement="top">
              <DeleteIcon className={classes.actionIcon} />
            </Tooltip>
          </IconButton>

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
