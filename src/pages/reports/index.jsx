import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import ReportsFilter from 'pages/reports/components/reports-filters-root';
import ReportsTable from 'components/table/reports-table';
import { selectPageName } from 'selectors/ui-flags';
import { initCertifiedReportsPage, initThematicGrantsPage, initGaviReportsPage, initGaviStatementsPage } from 'actions';
import { THEMATIC_GRANTS, REPORTS, GAVI_REPORTS, GAVI_STATEMENTS_ACC } from 'lib/constants';
import { onReceiveReports } from 'slices/reports';

function thematicGrantsEffect(dispatch) {
  return () => {
    dispatch(initThematicGrantsPage());
  };
}

function gaviReportsEffect(dispatch) {
  return () => {
    dispatch(initGaviReportsPage());
  };
}

function gaviStatementsEffect(dispatch) {
  return () => {
    dispatch(initGaviStatementsPage());
  };
}

function defaultEffect() {
  return () => { };
}

function certifiedReportsEffect(dispatch, donorId) {
  return () => {
    dispatch(initCertifiedReportsPage(donorId));
  };
}

// use this hook to customize which api calls are made
// for the selected page as we render the reports table
const useInitPage = pageName => {
  const dispatch = useDispatch();
  const { donorId } = useParams();

  switch (pageName) {
    case THEMATIC_GRANTS:
      return thematicGrantsEffect(dispatch);
    case GAVI_REPORTS:
      return gaviReportsEffect(dispatch);
    case GAVI_STATEMENTS_ACC:
      return gaviStatementsEffect(dispatch);
    case REPORTS:
      return certifiedReportsEffect(dispatch, donorId);
    default:
      return defaultEffect;
  }
};

export default function ReportsPage() {
  const pageName = useSelector(selectPageName);
  const dispatch = useDispatch();
  const effect = useInitPage(pageName);
  useEffect(() => {
    const cleanup = effect();
    return cleanup;
  }, [pageName, dispatch]);

  useEffect(() => {
    dispatch(onReceiveReports([]));
    return () => {
      dispatch(onReceiveReports([]));
    };
  }, [pageName, dispatch]);

  return (
    <>
      <ReportsFilter />
      <ReportsTable />
    </>
  );
}
