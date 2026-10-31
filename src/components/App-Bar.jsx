import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from 'styles/makeStyles';
import { AppBar, Toolbar, Box, Typography, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import horizontalLogo from '../assets/images/UNICEF_White_Horizontal.png';
import ErrorsSnackbar from './Errors-Snackbar';
import { selectUserName } from 'selectors/ui-flags';
import SuccessSnackbar from './Success-Snackbar';
import clsx from 'clsx';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const useStyles = makeStyles(theme =>
  ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: theme.palette.primary.strong
    },
    toolbar: {
      minHeight: 112
    },
    iconBox: {
      width: 48,
      height: 48
    },
    iconBtn: {
      padding: 0
    },
    headerIcon: {
      fill: theme.palette.primary[400]
    },
    headerLogo: {
      width: 'auto',
      height: 52,
      maxWidth: '60%',
      display: 'block',
      objectFit: 'contain'
    },
    noPrint: {
      '@media print': {
        display: 'none'
      }
    },
    banner: {
      color: '#FFF',
      lineHeight: '1.25em',
      fontSize: '15px'
    },
    appTitle: {
      paddingLeft: '12px'
    },
    button: {
      color: 'white'
    }
  })
);

export default function AppToolbar() {
  const classes = useStyles();
  const theme = useTheme();
  const userName = useSelector(selectUserName);

  function logout() {
    window.location.href = `/security/unicef-logout/`;
  }

  return (
    <AppBar
      className={classes.appBar}
      position="fixed"
      sx={{ zIndex: theme.zIndex.drawer + 1, backgroundColor: theme.palette.primary.strong, color: '#FFF' }}
    >
      <Toolbar className={classes.toolbar} style={{ minHeight: 112 }}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <img src={horizontalLogo} className={classes.headerLogo} alt="UNICEF" />
            <IconButton aria-label="logout" className={classes.button} onClick={logout} sx={{ ml: 2 }}>
              <ExitToAppIcon />
            </IconButton>
          </Box>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <Typography className={clsx(classes.appTitle, classes.banner)}>Donor Reporting Portal</Typography>
            <Typography className={classes.banner} sx={{ color: '#FFF', lineHeight: '1.25em', fontSize: '15px' }}>{userName}</Typography>
          </Box>
        </Box>
      </Toolbar>
      <ErrorsSnackbar />
      <SuccessSnackbar />
    </AppBar>
  );
}
