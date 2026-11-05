import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Box,
  CircularProgress,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';

import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

import {
  APP_BAR_HEIGHT,
  DRAWER_WIDTH,
  SEARCH_REPORTS,
  POOLED_GRANTS,
  THEMATIC_GRANTS,
  USERS_PORTAL,
  USERS_PORTAL_PATH,
  TRAINING_LINK,
  DRP_OPEN_TICKET_URL,
  ADMIN,
  GAVI_REPORTS,
  GAVI_REPORTS_CTN,
  GAVI_STATEMENTS_ACC,
  COVAX,
  isGaviSectionPath
} from '../lib/constants';
import { selectMenuBarPage } from 'selectors/ui-flags';
import { selectConfig, selectDonors } from 'selectors/collections';
import { menuItemSelected } from 'slices/ui';
import { usePermissions } from './PermissionRedirect';
import { getDonors } from 'api';
import { makeStyles } from 'styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    width: DRAWER_WIDTH,
    flexShrink: 0
  },
  paper: {
    width: DRAWER_WIDTH,
    display: 'flex',
    flexDirection: 'column'
  },
  toolbarSpacer: {
    minHeight: APP_BAR_HEIGHT,
    height: APP_BAR_HEIGHT,
    flexShrink: 0
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: 0
  },
  scrollArea: {
    flex: 1,
    overflowY: 'auto',
    paddingTop: theme.spacing(1)
  },
  sectionLabel: {
    color: theme.palette.text.secondary,
    padding: theme.spacing(1.5, 3, 0.5)
  },
  divider: {
    margin: theme.spacing(1, 2)
  },
  footer: {
    flexShrink: 0,
    padding: theme.spacing(1, 0, 1.5),
    borderTop: `1px solid ${theme.palette.divider}`
  },
  footerNote: {
    color: theme.palette.text.secondary,
    padding: theme.spacing(0.5, 3)
  }
}));

export const useNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuBarPage = useSelector(selectMenuBarPage);

  const handleNav = page => () => {
    if (page === TRAINING_LINK) {
      window.open(TRAINING_LINK, '_blank', 'noopener,noreferrer');
      return;
    }
    if (page === ADMIN) {
      window.location.href = `${window.location.origin}/admin/`;
      return;
    }
    dispatch(menuItemSelected(page));
    if (page === SEARCH_REPORTS || page === POOLED_GRANTS) {
      navigate('/');
    } else {
      navigate(`/${page}`);
    }
  };

  function navSelected(page) {
    return page === menuBarPage;
  }

  function goHome() {
    navigate('/');
  }

  return { handleNav, navSelected, goHome };
};

export default function ConnectedDrawer({ mobileOpen = false, onClose, showDrawer = false }) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const { isUnicefUser, isSuperUser, isGaviDonor } = usePermissions();
  const config = useSelector(selectConfig);
  const donors = useSelector(selectDonors);
  const [resolvingGaviDonor, setResolvingGaviDonor] = useState(false);
  const isGaviSection = isGaviSectionPath(location.pathname);

  useEffect(() => {
    dispatch(menuItemSelected(isGaviDonor ? GAVI_REPORTS : SEARCH_REPORTS));
  }, []);

  const { handleNav, navSelected } = useNav();

  function navigateTo(page) {
    handleNav(page)();
    if (onClose) {
      onClose();
    }
  }

  async function openUserManagement() {
    const gaviDonorCode = config?.gavi_donor_code;

    if (!isGaviSection || !gaviDonorCode) {
      navigateTo(USERS_PORTAL);
      return;
    }

    setResolvingGaviDonor(true);
    try {
      const matchingDonors = await getDonors({ code: gaviDonorCode });
      const donorList = Array.isArray(matchingDonors)
        ? matchingDonors
        : matchingDonors?.results || [];
      const gaviDonor =
        donorList.find(donor => donor.code === gaviDonorCode) ||
        donors.find(donor => donor.code === gaviDonorCode);

      if (gaviDonor?.id) {
        navigate(`${USERS_PORTAL_PATH}/${gaviDonor.id}`);
        if (onClose) {
          onClose();
        }
      } else {
        navigateTo(USERS_PORTAL);
      }
    } catch {
      const fallbackDonor = donors.find(donor => donor.code === gaviDonorCode);
      if (fallbackDonor?.id) {
        navigate(`${USERS_PORTAL_PATH}/${fallbackDonor.id}`);
        if (onClose) {
          onClose();
        }
      } else {
        navigateTo(USERS_PORTAL);
      }
    } finally {
      setResolvingGaviDonor(false);
    }
  }

  function openPrivacyPolicy() {
    navigate('/privacy-policy');
    if (onClose) {
      onClose();
    }
  }

  const navButton = (page, label, Icon) => (
    <ListItemButton
      key={page}
      selected={navSelected(page)}
      onClick={() => navigateTo(page)}
      aria-current={navSelected(page) ? 'page' : undefined}
    >
      <ListItemIcon>
        <Icon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );

  const persistent = showDrawer && isDesktop;

  return (
    <Drawer
      className={persistent ? classes.root : undefined}
      variant={persistent ? 'permanent' : 'temporary'}
      open={showDrawer && (isDesktop || mobileOpen)}
      onClose={onClose}
      classes={{ paper: classes.paper }}
      anchor="left"
      ModalProps={{ keepMounted: true }}
      sx={{ zIndex: theme.zIndex.drawer }}
    >
      <Box className={classes.toolbarSpacer} />
      <Box component="nav" aria-label="Main navigation" className={classes.content}>
        <Box className={classes.scrollArea}>
          <Typography variant="overline" className={classes.sectionLabel} component="p">
            {isGaviSection ? 'GAVI reporting' : 'Donor reporting'}
          </Typography>

          <List disablePadding>
            {!isGaviSection && (
              <>
                {navButton(SEARCH_REPORTS, 'Reports', AssessmentOutlinedIcon)}
                {navButton(POOLED_GRANTS, 'Pooled Grants', LayersOutlinedIcon)}
                {navButton(THEMATIC_GRANTS, 'Thematic Grants', CategoryOutlinedIcon)}
              </>
            )}

            {isGaviSection && (
              <>
                {navButton(GAVI_REPORTS, 'Gavi Reports', AssessmentOutlinedIcon)}
                {navButton(COVAX, 'Covax', PublicOutlinedIcon)}
                {navButton(GAVI_REPORTS_CTN, 'Gavi Adjusting CTNs', TuneOutlinedIcon)}
                {navButton(GAVI_STATEMENTS_ACC, 'Gavi Statements of Account', ReceiptLongOutlinedIcon)}
              </>
            )}
          </List>

          <Divider className={classes.divider} />

          <Typography variant="overline" className={classes.sectionLabel} component="p">
            Administration
          </Typography>
          <List disablePadding>
            <ListItemButton
              selected={navSelected(USERS_PORTAL)}
              onClick={openUserManagement}
              disabled={resolvingGaviDonor}
              aria-current={navSelected(USERS_PORTAL) ? 'page' : undefined}
            >
              <ListItemIcon>
                {resolvingGaviDonor ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <ManageAccountsOutlinedIcon fontSize="small" />
                )}
              </ListItemIcon>
              <ListItemText primary="User Management" />
            </ListItemButton>
            {isSuperUser && navButton(ADMIN, 'Admin console', AdminPanelSettingsOutlinedIcon)}
            {!isGaviSection && isUnicefUser && navButton(TRAINING_LINK, 'Training material', MenuBookOutlinedIcon)}
          </List>
        </Box>

        <Box className={classes.footer}>
          {isSuperUser && (
            <ListItemButton
              component="a"
              href={DRP_OPEN_TICKET_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open a DRP ticket in ServiceNow (opens in a new tab)"
              sx={{ mb: 0.5 }}
            >
              <ListItemIcon>
                <SupportAgentOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="DRP open ticket" />
              <OpenInNewOutlinedIcon
                sx={{ fontSize: 16, color: theme.palette.text.secondary }}
              />
            </ListItemButton>
          )}
          <ListItemButton onClick={openPrivacyPolicy}>
            <ListItemIcon>
              <PrivacyTipOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Privacy policy" />
          </ListItemButton>
          <Typography variant="caption" className={classes.footerNote} component="p">
            UNICEF Donor Reporting Portal
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}

ConnectedDrawer.propTypes = {
  mobileOpen: PropTypes.bool,
  onClose: PropTypes.func,
  showDrawer: PropTypes.bool
};
