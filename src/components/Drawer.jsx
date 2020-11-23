import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useMainStyles } from './Main';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer
} from '@material-ui/core';

import DescriptionIcon from '@material-ui/icons/Description';
import SettingsIcon from '@material-ui/icons/Settings';
import { SEARCH_REPORTS, POOLED_GRANTS, THEMATIC_GRANTS, USERS_PORTAL, TRAINING_LINK } from '../lib/constants';
import { selectMenuBarPage, selectAssignedRole, selectPageName } from 'selectors/ui-flags';
import { menuItemSelected } from 'slices/ui';
import { usePermissions } from './PermissionRedirect';

export const useNav = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleNav = page => () => {
    if (page === TRAINING_LINK) {
      window.open(TRAINING_LINK, '_blank')
      return;
    }
    dispatch(menuItemSelected(page));
    if (page === SEARCH_REPORTS || page === POOLED_GRANTS) {
      history.push('/');
    } else {
      history.push(`/${page}`);
    }
  };

  function navSelected(page) {
    return page === useSelector(selectMenuBarPage);
  }

  return { handleNav, navSelected };
};

export default function ConnectedDrawer() {
  const classes = useMainStyles();
  const dispatch = useDispatch();

  const { isDonorAdmin, isSuperUser } = usePermissions();
  const hasAccessUserManagement = isDonorAdmin || isSuperUser;
  const isAssignedRole = useSelector(selectAssignedRole);
  const { isUnicefUser } = usePermissions();
  const pageName = useSelector(selectPageName);
  const showDrawer = isAssignedRole && pageName !== 'privacy-policy';

  useEffect(() => {
    dispatch(menuItemSelected(SEARCH_REPORTS));
  }, []);

  const { handleNav, navSelected } = useNav();
  return (
    <Drawer
      className={classes.drawer}
      variant={showDrawer ? "permanent" : "temporary"}
      classes={{
        paper: classes.drawerPaper
      }}
      anchor="left"
    >
      <Box className={classes.toolbar} />
      <List>
        {/* <ListItem selected={navSelected(REPORTS)} onClick={handleNav(REPORTS)} button>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem> */}

        <ListItem
          selected={navSelected(SEARCH_REPORTS)}
          onClick={handleNav(SEARCH_REPORTS)}
          button
        >
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>

        <ListItem
          selected={navSelected(POOLED_GRANTS)}
          onClick={handleNav(POOLED_GRANTS)}
          button
        >
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Pooled Grants" />
        </ListItem>

        <ListItem
          selected={navSelected(THEMATIC_GRANTS)}
          onClick={handleNav(THEMATIC_GRANTS)}
          button
        >
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Thematic Grants" />
        </ListItem>

        {hasAccessUserManagement && (
          <ListItem selected={navSelected(USERS_PORTAL)} onClick={handleNav(USERS_PORTAL)} button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="User Management" />
          </ListItem>
        )}

        {isUnicefUser && (
          <ListItem onClick={handleNav(TRAINING_LINK)} button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Training Material" />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
}
