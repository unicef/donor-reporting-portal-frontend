import {
  takeLatest,
  call,
  put,
  all,
  select
} from 'redux-saga/effects';
import {
  format,
  subYears,
  startOfYear,
  endOfYear,
  getYear
} from 'date-fns';
import {
  selectDonorCode,
  selectIsUsGov,
  selectMenuBarPage,
  selectError,
  selectCurrentlyLoadedDonor
} from 'selectors/ui-flags';
import {
  selectReportYear
} from 'selectors/filter';
import {
  removeEmpties
} from 'lib/helpers';
import {
  getUsGovReports,
  getThematicReports,
  getReports
} from 'api';
import {
  waitFor,
  waitForBoolean
} from './helpers';
import {
  setLoading,
  setCurrentlyLoadedDonor
} from 'slices/ui';
import {
  onReceiveReports
} from 'slices/reports';
import {
  setError
} from 'slices/error';
import {
  onFetchReports
} from 'actions';

import {
  REPORT_END_DATE_BEFORE_FIELD,
  REPORT_END_DATE_AFTER_FIELD,
  EARLIEST_REPORTS_YEAR,
  DATE_FORMAT
} from 'pages/reports/constants';
import {
  THEMATIC_GRANTS,
  REPORTS
} from 'lib/constants';
import {
  isEmpty
} from 'ramda';

const currentDate = () => {
  let date = new Date();
  return date.getFullYear();
};

// Returns date filters for both last year and this year to be passed to
// the Certified Reports api since its an endpoint called by year.
// We must construct before and after dates from a year ago to end of last year and
// from beginning of this year to today.
function getInitialReportsFilterDates() {
  const today = new Date();

  const lastYearAfterDate = subYears(today, 1);

  const lastYearBeforeDate = endOfYear(lastYearAfterDate);

  const lastYear = getYear(lastYearAfterDate);
  const thisYear = getYear(today);
  const thisYearAfterDate = startOfYear(today);

  return {
    lastYear: {
      year: lastYear,
      [REPORT_END_DATE_BEFORE_FIELD]: format(lastYearBeforeDate, DATE_FORMAT),
      [REPORT_END_DATE_AFTER_FIELD]: format(lastYearAfterDate, DATE_FORMAT)
    },
    thisYear: {
      year: thisYear,
      [REPORT_END_DATE_BEFORE_FIELD]: format(today, DATE_FORMAT),
      [REPORT_END_DATE_AFTER_FIELD]: format(thisYearAfterDate, DATE_FORMAT)
    }
  };
}

function* getInitialReports(params, filtersGetter) {
  const defaultFilters = filtersGetter();
  let result = [];

  // call sequentially and keep successful calls
  try {
    const {
      year,
      ...defaultParams
    } = defaultFilters.lastYear;

    if (year >= EARLIEST_REPORTS_YEAR) {
      const lastYearsReports = yield call(
        getReports, {
          ...params,
          ...defaultParams
        },
        year + ' Certified Reports'
      );
      result = lastYearsReports;
    }
  } catch (err) {
    yield put(setError(err));
  }

  try {
    const {
      year,
      ...defaultParams
    } = defaultFilters.thisYear;
    const thisYearsReports = yield call(
      getReports, {
        ...params,
        ...defaultParams
      },
      year + ' Certified Reports'
    );
    result = [...result, ...thisYearsReports];
  } catch (err) {
    yield put(setError(err));
  }
  return result;
}

function* getCertifiedReports(params) {
  const currentlyLoadedDonor = yield select(selectCurrentlyLoadedDonor);

  // this is default / initial load only
  if (!currentlyLoadedDonor || currentlyLoadedDonor != params.donor_code) {
    yield put(setCurrentlyLoadedDonor(params.donor_code))
    const reports = yield call(getInitialReports, params, getInitialReportsFilterDates);
    return reports;
  }
  const reportYear = yield select(selectReportYear);
  const reports = yield call(getReports, params, reportYear);
  return reports;
}

// Tricky business requirement to call different endpoint based on donor property us_gov first,
// then whether theme or year were selected at report page
function* getCallerFunc(payload) {
  const reportPageName = yield select(selectMenuBarPage);

  let result = {
    params: {
      ...removeEmpties(payload)
    }
  };

  switch (reportPageName) {
    case THEMATIC_GRANTS:
      result.caller = getThematicReports;
      break;
    case REPORTS: {
      yield call(waitForBoolean, selectIsUsGov);
      const isUsGov = yield select(selectIsUsGov);
      yield call(waitFor, selectDonorCode);
      const donorCode = yield select(selectDonorCode);
      if (isUsGov) {
        const reportYear = yield select(selectReportYear);
        result.caller = getUsGovReports;
        result.arg = isEmpty(reportYear) ? currentDate() : reportYear;
        result.params.donor_code = donorCode;
        break;
      } else {
        result.caller = getCertifiedReports;
        result.params.donor_code = donorCode;
        break;
      }
    }
  }
  return result;
}

function* handleFetchReports({
  payload
}) {
  try {
    // Resolve the caller first so a blocked wait for config/donor data cannot
    // leave the global loading overlay stuck.
    const {
      caller,
      params,
      arg
    } = yield call(getCallerFunc, payload);
    yield put(setLoading(true));

    const reports = yield call(caller, params, arg);
    yield put(onReceiveReports(reports));
  } catch (err) {
    const existingError = yield select(selectError);
    if (!existingError) {
      yield put(setError(err));
    }
  } finally {
    yield put(setLoading(false));
  }
}

export default function* () {
  yield all([yield takeLatest(onFetchReports.type, handleFetchReports)]);
}
