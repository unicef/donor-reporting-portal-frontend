import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { makeStyles } from 'styles/makeStyles';
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import horizontalLogo from '../assets/images/UNICEF_White_Horizontal.png';
import ErrorsSnackbar from './Errors-Snackbar';
import SuccessSnackbar from './Success-Snackbar';
import { selectUserProfile } from 'selectors/ui-flags';
import { APP_BAR_HEIGHT, isGaviSectionPath } from 'lib/constants';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundImage: `linear-gradient(100deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 52%, #1479B4 100%)`
  },
  toolbar: {
    minHeight: APP_BAR_HEIGHT,
    height: APP_BAR_HEIGHT,
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    gap: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    }
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    minWidth: 0,
    flex: 1
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    minWidth: 0,
    flex: 1,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      gap: theme.spacing(0.25)
    }
  },
  logo: {
    height: 20,
    width: 'auto',
    display: 'block',
    objectFit: 'contain',
    flexShrink: 0,
    [theme.breakpoints.up('sm')]: {
      height: 28
    },
    [theme.breakpoints.up('md')]: {
      height: 38
    }
  },
  divider: {
    borderColor: 'rgba(255, 255, 255, 0.28)',
    height: 28,
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  },
  titleBlock: {
    minWidth: 0,
    maxWidth: '100%'
  },
  portalName: {
    color: '#FFFFFF',
    fontSize: '0.75rem',
    fontWeight: 600,
    lineHeight: 1.25,
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.8125rem'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1rem',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  },
  portalSubtitle: {
    color: 'rgba(255, 255, 255, 0.72)',
    display: 'block',
    marginTop: 1
  },
  menuButton: {
    color: '#FFFFFF'
  },
  accountButton: {
    padding: 3,
    border: '1px solid rgba(255, 255, 255, 0.28)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    }
  },
  avatar: {
    width: 34,
    height: 34,
    fontSize: '0.8125rem',
    fontWeight: 700,
    color: theme.palette.secondary.main,
    backgroundColor: '#FFFFFF'
  },
  userDetails: {
    padding: theme.spacing(1.5, 2),
    minWidth: 220
  },
  userName: {
    fontWeight: 600,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  noPrint: {
    flexShrink: 0,
    '@media print': {
      display: 'none'
    }
  }
}));

function getInitials(name = '') {
  const cleanName = name.split('@')[0].replace(/[._-]+/g, ' ').trim();
  const parts = cleanName.split(/\s+/).filter(Boolean);

  if (!parts.length) {
    return '?';
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function AppToolbar({ onMenuClick, showMenuButton = false }) {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [accountAnchor, setAccountAnchor] = useState(null);
  const profile = useSelector(selectUserProfile);
  const userName = profile?.username || profile?.email || '';
  const isGaviSection = isGaviSectionPath(location.pathname);
  const portalName = isGaviSection
    ? 'Donor Reporting Portal - GAVI'
    : 'Donor Reporting Portal';

  useEffect(() => {
    document.title = portalName;
  }, [portalName]);

  function logout() {
    window.location.href = `/security/unicef-logout/`;
  }

  function openPrivacyPolicy() {
    setAccountAnchor(null);
    navigate('/privacy-policy');
  }

  return (
    <AppBar
        className={classes.appBar}
        position="fixed"
        color="transparent"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: "100%",
        }}
    >
      <Toolbar className={classes.toolbar}>
        <Box className={classes.left}>
          {showMenuButton && (
            <IconButton
              aria-label="Open navigation menu"
              className={classes.menuButton}
              edge="start"
              onClick={onMenuClick}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box className={classes.brand}>
            <img src={horizontalLogo} className={classes.logo} alt="UNICEF" />
            <Divider orientation="vertical" flexItem className={classes.divider} />
            <Box className={classes.titleBlock}>
              <Typography className={classes.portalName} component="p">
                {portalName}
              </Typography>
              {isDesktop && (
                <Typography variant="caption" className={classes.portalSubtitle} component="p">
                  Reports and account management
                </Typography>
              )}
            </Box>
          </Box>
        </Box>

        <Box className={classes.noPrint}>
          <Tooltip title="Account menu">
            <IconButton
              aria-label="Open account menu"
              aria-controls={accountAnchor ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={accountAnchor ? 'true' : undefined}
              className={classes.accountButton}
              onClick={event => setAccountAnchor(event.currentTarget)}
            >
              <Avatar className={classes.avatar}>{getInitials(userName)}</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>

      <ErrorsSnackbar />
      <SuccessSnackbar />

      <Menu
        id="account-menu"
        anchorEl={accountAnchor}
        open={Boolean(accountAnchor)}
        onClose={() => setAccountAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { mt: 1, width: 280, maxWidth: 'calc(100vw - 24px)' }
          }
        }}
      >
        <Box className={classes.userDetails}>
          <Typography variant="subtitle2" className={classes.userName} title={userName}>
            {userName || 'Signed in'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            UNICEF Donor Reporting Portal
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={openPrivacyPolicy}>
          <ListItemIcon>
            <PrivacyTipOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Privacy policy
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>
    </AppBar>
  );
}

AppToolbar.propTypes = {
  onMenuClick: PropTypes.func,
  showMenuButton: PropTypes.bool
};
