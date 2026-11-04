import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { makeStyles } from 'styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: theme.spacing(6, 3)
  },
  icon: {
    width: 56,
    height: 56,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white
  },
  title: {
    marginBottom: theme.spacing(0.5)
  },
  description: {
    maxWidth: 420,
    color: theme.palette.text.secondary
  },
  action: {
    marginTop: theme.spacing(2.5)
  }
}));

/**
 * Friendly, reusable empty state used by tables and full page screens.
 */
export default function EmptyState({ icon, title, description, action }) {
  const classes = useStyles();

  return (
    <Box className={classes.root} role="status">
      {icon && <Box className={classes.icon}>{icon}</Box>}
      <Typography variant="h6" className={classes.title}>
        {title}
      </Typography>
      {description && <Typography className={classes.description}>{description}</Typography>}
      {action && <Box className={classes.action}>{action}</Box>}
    </Box>
  );
}

EmptyState.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  description: PropTypes.node,
  action: PropTypes.node
};
