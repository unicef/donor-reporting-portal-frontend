// import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { equals } from 'ramda';
import { useLocation } from 'react-router';
import { menuItemSelected, onRouteChange } from 'slices/ui';
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

    // Do not reset loading here. Child page effects (e.g. the search filter
    // root) fire before this parent effect and start the new page's fetch;
    // clearing loading afterwards would immediately hide the table spinner on
    // Thematic Grants, Gavi, etc. Abandoned requests already release their
    // loading slot in their saga's `finally`, and the loader is only started
    // once a saga has resolved its config/donor inputs.
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
