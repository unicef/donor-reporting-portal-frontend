import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { makeStyles } from 'styles/makeStyles';
import { Box, Typography } from '@mui/material';
import { getSubheadingFromParams } from 'lib/params';
import { selectDonorName, selectDonorCode } from 'selectors/ui-flags';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    margin: 0,
    padding: theme.spacing(3, 2, 0),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4, 3, 0)
    }
  },
  content: {
    minHeight: 56,
    paddingBottom: theme.spacing(1)
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  },
  eyebrow: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0.25)
  },
  title: {
    color: theme.palette.secondary.main,
    fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)',
    fontWeight: 700,
    lineHeight: 1.25,
    letterSpacing: '-0.01em'
  }
}));

function ContentHeader({ children }) {
  const location = useLocation();
  const classes = useStyles();
  const donorName = useSelector(selectDonorName);
  const donorCode = useSelector(selectDonorCode);
  const title = getSubheadingFromParams(location.pathname, donorName, donorCode).replace(/\s+/g, ' ').trim();

  if (!title) {
    return null;
  }

  return (
    <Box className={`${classes.root} ${classes.content}`}>
      <Box className={classes.header}>
        <Box>
          <Typography variant="overline" className={classes.eyebrow} component="p">
            Donor reporting
          </Typography>
          <Typography className={classes.title} variant="h5" component="h1">
            {title}
          </Typography>
        </Box>
      </Box>
      {children}
    </Box>
  );
}

export default ContentHeader;
ContentHeader.propTypes = {
  children: PropTypes.node
};
