import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { makeStyles } from 'styles/makeStyles';
import { Box } from '@mui/material';
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
  ({
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
  const trackerUrl = config.tracker.site_tracker;
  const instance = React.useMemo(
    () =>
      createInstance({
        urlBase: trackerUrl || window.location.origin,
        siteId: config.tracker.site_id || 6,
        userId: profile.email,
        disabled: !trackerUrl, // no-op until the tracker config is loaded
        heartBeat: {
          // optional, enabled by default
          active: true, // optional, default value: true
          seconds: 10 // optional, default value: `15
        },
        linkTracking: true
      }),
    [trackerUrl, config.tracker.site_id, profile.email]
  );

  return (
    <MatomoProvider value={instance}>
      <div className={classes.root}>
        <AppToolbar />
        <ConnectedDrawer />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <ContentHeader />

          <div className={classes.contentWrapper}>
            <Box sx={{ flexDirection: 'column' }}>
              <Routes>
                <Route path="/no-role" element={<NoRole />} />
                <Route
                  element={
                    <UnassignedDonor>
                      <Outlet />
                    </UnassignedDonor>
                  }
                >
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />

                  <Route path="/" element={<PermissionRedirect />} />

                  <Route
                    path="/donors"
                    element={
                      <ProtectedRouteDonorsList>
                        <DonorsList />
                      </ProtectedRouteDonorsList>
                    }
                  />

                  <Route
                    path={`/${SEARCH_REPORTS}/:donorId?`}
                    element={
                      <ProtectedRouteReportPage path={`/${SEARCH_REPORTS}/:donorId?`}>
                        <SearchPage />
                      </ProtectedRouteReportPage>
                    }
                  />

                  <Route
                    path={`/${POOLED_GRANTS}/:donorId?`}
                    element={
                      <ProtectedRouteReportPage path={`/${POOLED_GRANTS}/:donorId?`}>
                        <SearchPage />
                      </ProtectedRouteReportPage>
                    }
                  />

                  <Route
                    path={`/${THEMATIC_GRANTS}`}
                    element={
                      <ProtectedRouteReportPage path={`/${THEMATIC_GRANTS}`}>
                        <SearchPage />
                      </ProtectedRouteReportPage>
                    }
                  />

                  <Route
                    path={`/${COVAX}`}
                    element={
                      <ProtectedRouteReportPage path={`/${COVAX}`}>
                        <SearchPage />
                      </ProtectedRouteReportPage>
                    }
                  />

                  <Route
                    path={`/${GAVI_REPORTS}`}
                    element={
                      <ProtectedRouteReportPage path={`/${GAVI_REPORTS}`}>
                        <SearchPage />
                      </ProtectedRouteReportPage>
                    }
                  />

                  <Route
                    path={`/${GAVI_REPORTS_CTN}`}
                    element={
                      <ProtectedRouteReportPage path={`/${GAVI_REPORTS_CTN}`}>
                        <SearchPage />
                      </ProtectedRouteReportPage>
                    }
                  />

                  <Route
                    path={`/${GAVI_STATEMENTS_ACC}`}
                    element={
                      <ProtectedRouteReportPage path={`/${GAVI_STATEMENTS_ACC}`}>
                        <SearchPage />
                      </ProtectedRouteReportPage>
                    }
                  />

                  {/* Optional donorId param here since donor list is not aware of what page
                  to link to per donor and only super users can choose donor for user management */}
                  <Route
                    path={`${USERS_PORTAL_PATH}/:donorId?`}
                    element={<ProtectedRouteUserManagement />}
                  />

                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Box>
          </div>
        </main>
      </div>
    </MatomoProvider>
  );
}
