import React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import { makeStyles, createStyles, Box } from '@material-ui/core';
import ConnectedDrawer from './Drawer';
import AppToolbar from './App-Bar';
import {
  DRAWER_WIDTH,
  USERS_PORTAL_PATH,
  THEMATIC_GRANTS,
  POOLED_GRANTS,
  SEARCH_REPORTS,
  GAVI_REPORTS,
  GAVI_REPORTS_CTN,
  GAVI_STATEMENTS_ACC,
  COVAX
} from '../lib/constants';
import DonorsList from 'pages/donors-list';
import ContentHeader from './Content-Header';
import SearchPage from 'pages/reports/search';
import PrivacyPolicy from 'pages/privacy-policy';
import {
  ProtectedRouteDonorsList,
  ProtectedRouteReportPage,
  ProtectedRouteUserManagement,
  UnassignedDonor
} from '../pages/Authorized';

import PermissionRedirect from './PermissionRedirect';
import NotFound from './404';
import NoRole from './No-Role';
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react';
import { selectConfig } from 'selectors/collections';
import { useSelector } from 'react-redux';
import { selectUserProfile } from 'selectors/ui-flags';

export const useMainStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex'
    },
    drawer: {
      width: DRAWER_WIDTH,
      flexShrink: 0
    },
    drawerPaper: {
      width: DRAWER_WIDTH
    },
    drawerHeader: {
      padding: theme.spacing(1)
    },
    toolbar: {
      ...theme.mixins.toolbar,
      minHeight: 64,
      height: 112
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default
    },
    contentWrapper: {
      padding: theme.spacing(3)
    },
    title: {
      fontSize: 16,
      fontWeight: 600,
      padding: theme.spacing(1),
      lineHeight: '1.2em',
      textTransform: 'uppercase'
    },
    divider: {
      borderRight: `1px solid ${theme.palette.common.white}`,
      padding: theme.spacing(2)
    },
    logo: {
      maxHeight: '100%',
      maxWidth: 77
    }
  })
);

export default function MainAppBar() {
  const classes = useMainStyles();
  const config = useSelector(selectConfig);
  const profile = useSelector(selectUserProfile);
  const instance = createInstance({
    urlBase: config.tracker.site_tracker,
    siteId: config.tracker.site_id || 6,
    userId: profile.email,
    disabled: false, // optional, false by default. Makes all tracking calls no-ops if set to true.
    heartBeat: {
      // optional, enabled by default
      active: true, // optional, default value: true
      seconds: 10 // optional, default value: `15
    },
    linkTracking: true
  });

  return (
    <MatomoProvider value={instance}>
      <div className={classes.root}>
        <AppToolbar />
        <ConnectedDrawer />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <ContentHeader />

          <div className={classes.contentWrapper}>
            <Box flexDirection="column">
              <Switch>
                <Route exact path="/no-role" component={NoRole} />
                <UnassignedDonor path="*">
                  <Switch>
                    <Route exact path="/privacy-policy" component={PrivacyPolicy} />

                    <Route exact path="/" component={PermissionRedirect} />

                    <ProtectedRouteDonorsList exact path="/donors">
                      <DonorsList />
                    </ProtectedRouteDonorsList>

                    {/* <ProtectedRouteReportPage exact path={`/${REPORTS}/:donorId?`}>
                    <ReportsPage />
                  </ProtectedRouteReportPage> */}

                    <ProtectedRouteReportPage exact path={`/${SEARCH_REPORTS}/:donorId?`}>
                      <SearchPage />
                    </ProtectedRouteReportPage>

                    <ProtectedRouteReportPage exact path={`/${POOLED_GRANTS}/:donorId?`}>
                      <SearchPage />
                    </ProtectedRouteReportPage>

                    <ProtectedRouteReportPage exact path={`/${THEMATIC_GRANTS}`}>
                      <SearchPage />
                    </ProtectedRouteReportPage>

                    <ProtectedRouteReportPage exact path={`/${COVAX}`}>
                      <SearchPage />
                    </ProtectedRouteReportPage>

                    <ProtectedRouteReportPage exact path={`/${GAVI_REPORTS}`}>
                      <SearchPage />
                    </ProtectedRouteReportPage>

                    <ProtectedRouteReportPage exact path={`/${GAVI_REPORTS_CTN}`}>
                      <SearchPage />
                    </ProtectedRouteReportPage>

                    <ProtectedRouteReportPage exact path={`/${GAVI_STATEMENTS_ACC}`}>
                      <SearchPage />
                    </ProtectedRouteReportPage>                    

                    {/* Optional donorId param here since donor list is not aware of what page
                  to link to per donor and only super users can choose donor for user management */}
                    <ProtectedRouteUserManagement path={`${USERS_PORTAL_PATH}/:donorId?`} />

                    <Route path="*" component={NotFound} />
                  </Switch>
                </UnassignedDonor>
              </Switch>
            </Box>
          </div>
        </main>
      </div>
    </MatomoProvider>
  );
}
