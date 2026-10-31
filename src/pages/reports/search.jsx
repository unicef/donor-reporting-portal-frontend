import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import SearchReportsFilter from 'pages/reports/components/search-reports-filters-root';
import SearchReportsTable from 'components/table/search-reports-table';
import Footer from 'components/Footer';
import { selectPageName } from 'selectors/ui-flags';
import {
  initSearchReportsPage,
  initPooledGrantsPage,
  initThematicGrantsPage,
  initGaviReportsPage,
  initGaviStatementsPage
} from 'actions';
import { onReceiveSearchReports } from 'slices/search-reports';
import {
  GAVI_REPORTS,
  GAVI_REPORTS_CTN,
  GAVI_STATEMENTS_ACC,
  POOLED_GRANTS,
  SEARCH_REPORTS,
  THEMATIC_GRANTS
} from 'lib/constants';

function searchReportsEffect(dispatch, donorId) {
  return () => {
    dispatch(initSearchReportsPage(donorId));
  };
}

function pooledGrantsEffect(dispatch, donorId) {
  return () => {
    dispatch(initPooledGrantsPage(donorId));
  };
}

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
  return () => {};
}

const useInitPage = pageName => {
  const dispatch = useDispatch();
  const { donorId } = useParams();
  switch (pageName) {
    case SEARCH_REPORTS:
      return searchReportsEffect(dispatch, donorId);
    case POOLED_GRANTS:
      return pooledGrantsEffect(dispatch, donorId);
    case THEMATIC_GRANTS:
      return thematicGrantsEffect(dispatch);
    case GAVI_REPORTS_CTN:
    case GAVI_REPORTS:
      return gaviReportsEffect(dispatch);
    case GAVI_STATEMENTS_ACC:
      return gaviStatementsEffect(dispatch);
    default:
      return defaultEffect;
  }
};

export default function SearchPage() {
  const pageName = useSelector(selectPageName);
  const dispatch = useDispatch();
  const effect = useInitPage(pageName);
  useEffect(() => {
    const cleanup = effect();
    return cleanup;
  }, [pageName, dispatch]);

  useEffect(() => {
    dispatch(onReceiveSearchReports([]));
    return () => {
      dispatch(onReceiveSearchReports([]));
    };
  }, [pageName, dispatch]);

  return (
    <>
      <SearchReportsFilter />
      <SearchReportsTable />
      <Footer />
    </>
  );
}
