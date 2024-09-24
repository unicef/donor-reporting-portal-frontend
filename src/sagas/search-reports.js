import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import {
  selectDonorCode,
  selectError,
  selectCurrentlyLoadedDonor,
  selectMenuBarPage,
  selectIsUnicefUser
} from 'selectors/ui-flags';
import { selectReportYear } from 'selectors/filter';
import { removeEmpties } from 'lib/helpers';
import {
  fetchSearchGavi,
  fetchSearchReports,
  fetchSearchGaviStatements
  // fetchThematicGrants,
  // fetchPooledGrants
} from 'api/search-index';
import { waitFor } from './helpers';
import { setLoading, setCurrentlyLoadedDonor } from 'slices/ui';
import { onReceiveSearchReports } from 'slices/search-reports';
import { setError } from 'slices/error';
import { onFetchSearchReports } from 'actions';
import { selectConfig } from 'selectors/collections';
import {
  SEARCH_REPORTS,
  THEMATIC_GRANTS,
  POOLED_GRANTS,
  GAVI_REPORTS,
  GAVI_REPORTS_CTN,
  GAVI_STATEMENTS_ACC,
  COVAX
} from '../lib/constants';

function* getInitialSearchReports(params) {
  let result = {};
  try {
    result = yield call(fetchSearchReports, params);
  } catch (err) {
    yield put(setError(err));
  }
  return result;
}

function* getSearchReports(params) {
  const reportPageName = yield select(selectMenuBarPage);
  const currentlyLoadedDonor = yield select(selectCurrentlyLoadedDonor);

  let searchReports = {};

  if (reportPageName === 'reports') {
    // this is default / initial load only
    if (!currentlyLoadedDonor || currentlyLoadedDonor != params.donor_code) {
      yield put(setCurrentlyLoadedDonor(params.donor_code));
      searchReports = yield call(getInitialSearchReports, params);
      return searchReports;
    }
    const reportYear = yield select(selectReportYear);
    searchReports = yield call(fetchSearchReports, params, reportYear);
  } else if (reportPageName === 'gavi-reports') {
    params.m_o_u_r_eference__not = 'ADJUSTING CTNS';
    searchReports = yield call(fetchSearchGavi, params);
  }  else if (reportPageName === 'covax') {
    params.m_o_u_r_eference = 'MOU 11 CTN - DEVICES,MOU 11 CTN - VACCINES';
    searchReports = yield call(fetchSearchGavi, params);
  }  
  else if (reportPageName === 'gavi-reports-ctn') {
    params.m_o_u_r_eference = 'ADJUSTING CTNS';
    searchReports = yield call(fetchSearchGavi, params);
  } else if (reportPageName === 'gavi-statements-acc') {
    searchReports = yield call(fetchSearchGaviStatements, params);
  } else {
    searchReports = yield call(fetchSearchReports, params);
  }
  return searchReports;
}

function* getSourceId() {
  yield call(waitFor, selectConfig);
  const config = yield select(selectConfig);
  return config.source_id;
}

function* getSearchCallerFunc(payload) {
  const reportPageName = yield select(selectMenuBarPage);
  const isUnicefUser = yield select(selectIsUnicefUser);
  let result = {
    params: {
      ...removeEmpties(payload)
    }
  };

  yield call(waitFor, getSourceId);
  const sourceIds = yield getSourceId(reportPageName);
  result.caller = getSearchReports;

  switch (reportPageName) {
    case THEMATIC_GRANTS: {
      result.params.source_id = isUnicefUser
        ? sourceIds.thematic_internal
        : sourceIds.thematic_external;
      if (process.env.NODE_ENV === 'development') {
        result.params.source_id = isUnicefUser
          ? process.env.REACT_APP_DRP_SOURCE_ID_THEMATIC_EXTERNAL
          : process.env.REACT_APP_DRP_SOURCE_ID_THEMATIC_INTERNAL;
      }
      break;
    }
    case COVAX:
    case GAVI_REPORTS_CTN:
    case GAVI_REPORTS: {
      yield call(waitFor, selectConfig);
      const config = yield select(selectConfig);
      result.params.donor_code = config.gavi_donor_code;
      result.params.source_id = sourceIds.gavi; // isUnicefUser ? UNICEF_GAVI_KEY :
      break;
    }
    case GAVI_STATEMENTS_ACC: {
      yield call(waitFor, selectConfig);
      const config = yield select(selectConfig);
      result.params.donor_code = config.gavi_donor_code;
      result.params.source_id = sourceIds.gavi_soa;
      break;
    }
    case POOLED_GRANTS: {
      yield call(waitFor, selectDonorCode);
      const donorCode = yield select(selectDonorCode);
      result.params.donor_code = donorCode;
      result.params.source_id = isUnicefUser ? sourceIds.pool_internal : sourceIds.pool_external;
      if (process.env.NODE_ENV === 'development') {
        result.params.source_id = isUnicefUser
          ? process.env.REACT_APP_DRP_SOURCE_ID_POOL_EXTERNAL
          : process.env.REACT_APP_DRP_SOURCE_ID_POOL_INTERNAL;
      }
      break;
    }
    case SEARCH_REPORTS: {
      yield call(waitFor, selectDonorCode);
      const donorCode = yield select(selectDonorCode);
      result.params.donor_code = donorCode;
      result.params.source_id = isUnicefUser ? sourceIds.internal : sourceIds.external;
      if (process.env.NODE_ENV === 'development') {
        result.params.source_id = isUnicefUser
          ? process.env.REACT_APP_DRP_SOURCE_ID_EXTERNAL
          : process.env.REACT_APP_DRP_SOURCE_ID_INTERNAL;
      }
      break;
    }
  }
  return result;
}

function* handleFetchSearchReports({ payload }) {
  try {
    yield put(setLoading(true));

    const { caller, params, arg } = yield call(getSearchCallerFunc, payload);

    const searchReports = yield call(caller, params, arg);
    yield put(onReceiveSearchReports(searchReports));
  } catch (err) {
    const existingError = yield select(selectError);
    if (!existingError) {
      yield put(setError(err));
    }
  } finally {
    yield put(setLoading(false));
  }
}

export default function*() {
  yield all([yield takeLatest(onFetchSearchReports.type, handleFetchSearchReports)]);
}
