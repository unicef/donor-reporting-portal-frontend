// import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { equals } from 'ramda';
import { useLocation } from 'react-router';
import { onRouteChange } from 'slices/ui';
import { useEffect } from 'react';
import { selectPageName, selectParamDonorId } from 'selectors/ui-flags';
import { usePermissions } from './PermissionRedirect';
import { initDonorsList, onFetchUserGroups } from 'actions';
import { selectDonors } from 'selectors/collections';
import {selectUserGroups} from 'selectors/user';

export default function ConnectedRouterWatcher({ children }) {
  const location = useLocation();
  const currentPageName = useSelector(selectPageName);
  const currentDonorId = useSelector(selectParamDonorId);
  const donors = useSelector(selectDonors);
  const groups = useSelector(selectUserGroups);
  const { canViewDonors } = usePermissions();
  const dispatch = useDispatch();

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
    const [page, donorId] = route;
    if (route.length && (!equals(currentPageName, page) || !equals(currentDonorId, donorId))) {
      dispatch(onRouteChange({ page, donorId: donorId || null }));
    }
  });

  return children;
}
