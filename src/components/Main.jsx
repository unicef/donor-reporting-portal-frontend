import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { makeStyles } from 'styles/makeStyles';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ConnectedDrawer from './Drawer';
import AppToolbar from './App-Bar';
import {
  APP_BAR_HEIGHT,
  USERS_PORTAL_PATH,
  THEMATIC_GRANTS,
  POOLED_GRANTS,
  SEARCH_REPORTS,
  GAVI_PATH,
  GAVI_REPORTS,
  GAVI_REPORTS_PATH,
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
import { selectAssignedRole, selectPageName, selectUserProfile } from 'selectors/ui-flags';

export const useMainStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh'
  },
  toolbar: {
    minHeight: `${APP_BAR_HEIGHT}px`,
    height: `${APP_BAR_HEIGHT}px`
  },
  content: {
    flexGrow: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    backgroundImage:
      'radial-gradient(circle at 92% 0%, rgba(28, 171, 226, 0.08), transparent 42%)'
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 1680,
    margin: '0 auto',
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3),
      paddingBottom: theme.spacing(6)
    }
  },
  skipLink: {
    position: 'absolute',
    left: theme.spacing(2),
    top: -100,
    zIndex: theme.zIndex.tooltip + 1,
    padding: theme.spacing(1, 2),
    borderRadius: 8,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'top 150ms ease-in-out',
    '&:focus': {
      top: theme.spacing(1.5)
    }
  }
}));

export default function MainAppBar() {
  const classes = useMainStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const config = useSelector(selectConfig);
  const profile = useSelector(selectUserProfile);
  const isAssignedRole = useSelector(selectAssignedRole);
  const pageName = useSelector(selectPageName);
  const showDrawer = isAssignedRole && pageName !== 'privacy-policy';
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

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <MatomoProvider value={instance}>
      <Box className={classes.root}>
        <a className={classes.skipLink} href="#main-content">
          Skip to main content
        </a>
        <AppToolbar
          showMenuButton={!isDesktop && showDrawer}
          onMenuClick={() => setMobileOpen(open => !open)}
        />
        <ConnectedDrawer
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
          showDrawer={showDrawer}
        />
        <Box component="main" id="main-content" tabIndex={-1} className={classes.content}>
          <div className={classes.toolbar} />
          <ContentHeader />

          <div className={classes.contentWrapper}>
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

                <Route path={GAVI_PATH} element={<Navigate to={GAVI_REPORTS_PATH} replace />} />

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
          </div>
        </Box>
      </Box>
    </MatomoProvider>
  );
}
