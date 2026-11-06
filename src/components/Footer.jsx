import React, { useState } from 'react';
import { Button, Link, Paper, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { makeStyles } from 'styles/makeStyles';

const STORAGE_KEY = 'drp.cookie-notice-dismissed';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1.5),
    padding: theme.spacing(1.5, 2),
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(1.5),
    borderRadius: 10,
    backgroundColor: theme.palette.background.paper
  },
  icon: {
    color: theme.palette.primary.dark,
    marginTop: 2,
    flexShrink: 0
  },
  text: {
    flex: 1,
    color: theme.palette.text.secondary
  },
  link: {
    color: theme.palette.secondary.main,
    fontWeight: 600
  },
  dismiss: {
    flexShrink: 0
  }
}));

export default function Footer() {
  const classes = useStyles();
  const [dismissed, setDismissed] = useState(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  function dismiss() {
    setDismissed(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Storage can be unavailable in private browsing; the notice still dismisses for this visit.
    }
  }

  if (dismissed) {
    return null;
  }

  return (
    <Paper className={classes.root} variant="outlined" role="region" aria-label="Cookie notice">
      <InfoOutlinedIcon className={classes.icon} fontSize="small" />
      <Typography variant="caption" className={classes.text}>
        We use cookies and other identifiers to help improve your online experience. By using our
        website you agree to this. Learn more in our{' '}
        <Link className={classes.link} component={RouterLink} to="/privacy-policy">
          privacy policy
        </Link>
        .
      </Typography>
      <Button className={classes.dismiss} size="small" onClick={dismiss}>
        Got it
      </Button>
    </Paper>
  );
}
