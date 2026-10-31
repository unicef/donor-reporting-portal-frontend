import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useMainStyles } from './Main';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Drawer } from '@mui/material';

import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  SEARCH_REPORTS,
  POOLED_GRANTS,
  THEMATIC_GRANTS,
  USERS_PORTAL,
  TRAINING_LINK,
  ADMIN,
  GAVI_REPORTS,
  GAVI_REPORTS_CTN,
  GAVI_STATEMENTS_ACC,
  COVAX
} from '../lib/constants';
import { selectMenuBarPage, selectAssignedRole, selectPageName } from 'selectors/ui-flags';
import { menuItemSelected } from 'slices/ui';
import { usePermissions } from './PermissionRedirect';

export const useNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuBarPage = useSelector(selectMenuBarPage);

  const handleNav = page => () => {
    if (page === TRAINING_LINK) {
      window.open(TRAINING_LINK, '_blank');
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

  return { handleNav, navSelected };
};

export default function ConnectedDrawer() {
  const classes = useMainStyles();
  const dispatch = useDispatch();

  const isAssignedRole = useSelector(selectAssignedRole);
  const { isUnicefUser, isSuperUser, isGaviDonor } = usePermissions();
  const pageName = useSelector(selectPageName);
  const showDrawer = isAssignedRole && pageName !== 'privacy-policy';

  useEffect(() => {
    dispatch(menuItemSelected(isGaviDonor ? GAVI_REPORTS : SEARCH_REPORTS));
  }, []);

  const { handleNav, navSelected } = useNav();
  return (
    <Drawer
      className={classes.drawer}
      variant={showDrawer ? 'permanent' : 'temporary'}
      classes={{
        paper: classes.drawerPaper
      }}
      anchor="left"
      sx={{ zIndex: theme => theme.zIndex.drawer }}
    >
      <Box className={classes.toolbar} />
      <List>
        {/* <ListItem selected={navSelected(REPORTS)} onClick={handleNav(REPORTS)} button>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem> */}

        <ListItemButton selected={navSelected(SEARCH_REPORTS)} onClick={handleNav(SEARCH_REPORTS)}>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItemButton>

        <ListItemButton selected={navSelected(POOLED_GRANTS)} onClick={handleNav(POOLED_GRANTS)}>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Pooled Grants" />
        </ListItemButton>

        <ListItemButton
          selected={navSelected(THEMATIC_GRANTS)}
          onClick={handleNav(THEMATIC_GRANTS)}
        >
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Thematic Grants" />
        </ListItemButton>

        <ListItemButton selected={navSelected(GAVI_REPORTS)} onClick={handleNav(GAVI_REPORTS)}>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Gavi Reports" />
        </ListItemButton>

        <ListItemButton selected={navSelected(COVAX)} onClick={handleNav(COVAX)}>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Covax" />
        </ListItemButton>

        <ListItemButton
          selected={navSelected(GAVI_REPORTS_CTN)}
          onClick={handleNav(GAVI_REPORTS_CTN)}
        >
        <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Gavi Adjusting CTNs" />
        </ListItemButton>

        <ListItemButton
          selected={navSelected(GAVI_STATEMENTS_ACC)}
          onClick={handleNav(GAVI_STATEMENTS_ACC)}
        >
        <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Gavi Statements of Account" />
        </ListItemButton>

        <ListItemButton selected={navSelected(USERS_PORTAL)} onClick={handleNav(USERS_PORTAL)}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="User Management" />
        </ListItemButton>

        {isSuperUser && (
          <ListItemButton onClick={handleNav(ADMIN)}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Admin" />
          </ListItemButton>
        )}

        {isUnicefUser && (
          <ListItemButton onClick={handleNav(TRAINING_LINK)}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Training Material" />
          </ListItemButton>
        )}
      </List>
    </Drawer>
  );
}
