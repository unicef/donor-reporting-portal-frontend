// import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { equals } from 'ramda';
import { useLocation } from 'react-router';
import { menuItemSelected, onRouteChange, resetLoading } from 'slices/ui';
import { useEffect } from 'react';
import { selectMenuBarPage, selectPageName, selectParamDonorId } from 'selectors/ui-flags';
import { usePermissions } from './PermissionRedirect';
import { initConfig, initDonorsList, onFetchUserGroups } from 'actions';
import { selectDonors, selectConfig } from 'selectors/collections';
import {selectUserGroups} from 'selectors/user';
import {
  COVAX,
  GAVI,
  GAVI_REPORTS,
  GAVI_REPORTS_CTN,
  GAVI_STATEMENTS_ACC,
  SEARCH_REPORTS,
  TABLE_PAGES,
  isGaviSectionPath
} from 'lib/constants';

const GAVI_MENU_PAGES = [
  GAVI,
  GAVI_REPORTS,
  GAVI_REPORTS_CTN,
  GAVI_STATEMENTS_ACC,
  COVAX
];

export default function ConnectedRouterWatcher({ children }) {
  const location = useLocation();
  const currentPageName = useSelector(selectPageName);
  const currentDonorId = useSelector(selectParamDonorId);
  const menuBarPage = useSelector(selectMenuBarPage);
  const donors = useSelector(selectDonors);
  const groups = useSelector(selectUserGroups);
  const config = useSelector(selectConfig);
  const { canViewDonors } = usePermissions();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!config || !config.source_id || !Object.keys(config.source_id).length) {
      dispatch(initConfig());
    }
  }, [config]);

  useEffect(() => {
    if (canViewDonors && !donors.length) {
      dispatch(initDonorsList());
    }
  }, [canViewDonors]);

  useEffect(() => {
     if (!groups.length) {
        dispatch(onFetchUserGroups());
     }
  }, []);

  useEffect(() => {
    // only dispatch if actual route changed, children change will trigger re-render of this component
    const route = location.pathname.split('/').filter(Boolean);
    if (!route.length) {
      return;
    }

    // A request started on the previous page can be abandoned mid-navigation
    // (e.g. a search waiting on a donor that is no longer selected). Its
    // loading counter would otherwise keep the fullscreen overlay up forever.
    // Clear it once the route has actually changed; fetches for the new page
    // re-enable the loader themselves.
    dispatch(resetLoading());

    const [page, donorId] = route;
    if (!equals(currentPageName, page) || !equals(currentDonorId, donorId)) {
      dispatch(onRouteChange({ page, donorId: donorId || null }));
    }

    // Returning from Gavi lands on /donors (or another DRP page that is not in
    // TABLE_PAGES). Reset the menu selection here, after the Gavi report page has
    // unmounted, so its search filters never react to a different page (and start
    // a search with no donor). Report routes already set it via onRouteChange.
    if (
      !isGaviSectionPath(location.pathname) &&
      !TABLE_PAGES.includes(page) &&
      (!menuBarPage || GAVI_MENU_PAGES.includes(menuBarPage))
    ) {
      dispatch(menuItemSelected(SEARCH_REPORTS));
    }
  }, [location.pathname]);

  return children;
}
