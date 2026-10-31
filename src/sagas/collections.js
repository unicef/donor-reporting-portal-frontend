import {
  takeLatest,
  call,
  put,
  all,
  select
} from 'redux-saga/effects';

import {
  getDonors,
  getGrants,
  getExternalGrants,
  getThemes,
  getStaticAssets,
  getMetadata,
  getOffices,
  getConfig,
  getGaviReports,
  getGaviStatements
} from 'api';

import {
  propEq,
  equals
} from 'ramda';

import {
  setError
} from 'slices/error';
import {
  setDonors
} from 'slices/donors';
import {
  initDonorsList,
  initCertifiedReportsPage,
  initThematicGrantsPage,
  initGaviReportsPage,
  initGaviStatementsPage,
  initPooledGrantsPage,
  initSearchReportsPage,
  initConfig
} from 'actions';
import {
  setLoading,
  onRouteChange
} from 'slices/ui';
import {
  onReceiveGrants
} from 'slices/grants';
import {
  onReceiveExternalGrants
} from 'slices/external-grants';
import {
  onReceivethemes
} from 'slices/themes';
import {
  onReceiveGavi
} from 'slices/gavi';
import {
  onReceiveStaticAssets,
  staticAssetsInitialState
} from 'slices/static';
import {
  onReceiveMetadata,
  metadataInitialState
} from 'slices/metadata';
import {
  onReceiveOffices
} from 'slices/offices';
import {
  selectUserProfile
} from 'selectors/ui-flags';
import {
  waitForLength,
  maybeFetch,
  waitFor
} from './helpers';
import {
  selectDonors,
  selectStaticAssets,
  selectMetadata,
  selectThemeCollection,
  selectOffices,
  selectConfig,
  selectGavi
} from 'selectors/collections';
import {
  currentDonorSelected
} from 'slices/donor';
import {
  configInitialState,
  onReceiveConfig
} from 'slices/config';
import {selectUserGaviGroups, selectUserGroups} from 'selectors/user';
import {setDonorUserGroups} from 'slices/user-groups';

function* handleFetchDonors() {
  try {
    yield put(setLoading(true));
    const donors = yield call(getDonors);
    yield put(setDonors(donors));
  } catch (err) {
    yield put(setError(err));
  } finally {
    yield put(setLoading(false));
  }
}

function* handleFetchGrants({
  payload
}) {
  try {
    const grants = yield call(getGrants, payload);
    yield put(onReceiveGrants(grants));
  } catch (err) {
    yield put(setError(err));
  }
}

function* handleFetchOffices() {
  try {
    const offices = yield call(getOffices);
    yield put(onReceiveOffices(offices));
  } catch (err) {
    yield put(setError(err));
  }
}

function* handleFetchExternalGrants({
  payload
}) {
  try {
    const grants = yield call(getExternalGrants, payload);
    yield put(onReceiveExternalGrants(grants));
  } catch (err) {
    yield put(setError(err));
  }
}

function* handleFetchThemes() {
  try {
    const themes = yield call(getThemes);
    yield put(onReceivethemes(themes));
  } catch (err) {
    yield put(setError(err));
  }
}

function* handleFetchGaviReports() {
  try {
    const reports = yield call(getGaviReports);
    yield put(onReceiveGavi(reports));
  } catch (err) {
    yield put(setError(err));
  }
}

function* handleFetchGaviStatementsReports() {
  try {
    const reports = yield call(getGaviStatements);
    yield put(onReceiveGavi(reports));
  } catch (err) {
    yield put(setError(err));
  }
}


function* handleFetchStatic() {
  const staticAssets = yield select(selectStaticAssets);

  if (!equals(staticAssets, staticAssetsInitialState)) {
    return;
  }

  try {
    const staticDropdowns = yield call(getStaticAssets);
    yield put(onReceiveStaticAssets(staticDropdowns));
  } catch (err) {
    yield put(setError(err));
  }
}

function* handleFetchMetadata() {
  const metadata = yield select(selectMetadata);

  if (!equals(metadata, metadataInitialState)) {
    return;
  }

  try {
    const metadataDropdowns = yield call(getMetadata);
    yield put(onReceiveMetadata(metadataDropdowns));
  } catch (err) {
    yield put(setError(err));
  }
}

function* handleFetchConfig() {
  const config = yield select(selectConfig);

  if (!equals(config, configInitialState)) {
    return;
  }

  try {
    const configAssets = yield call(getConfig);
    yield put(onReceiveConfig(configAssets));
  } catch (err) {
    yield put(setError(err));
  }
}

// Encapsulate logic for grabbing the current donor and persisting to state
// for easier access. Only UNICEF user or SuperUser can operate on any donor.
function* handleCurrentDonor({
  payload
}) {
  const profile = yield select(selectUserProfile);
  let donor;

  if (profile.is_unicef_user || profile.is_superuser) {
    yield call(waitForLength, selectDonors);
    const donors = yield select(selectDonors);
    donor = donors.find(propEq(Number(payload.donorId), 'id'));
  } else {
    donor = profile.donor;
  }

  // Select the donor first so the page can load its reports. The donor's user
  // groups are only needed by the filters / user management and must not block
  // the page (a user can legitimately have no groups).
  yield put(currentDonorSelected(donor));

  if (typeof donor !== 'undefined') {
    // set UserGroups of selected Donor, will need them in the filter and Add User popup
    yield call(waitFor, selectUserGaviGroups);
    const userGroups = yield select(selectUserGroups);
    const userGaviGroups = yield select(selectUserGaviGroups);
    const config = yield select(selectConfig);
    const donorUserGroups = donor.code === config.gavi_donor_code ? userGaviGroups : userGroups;
    yield put(setDonorUserGroups(donorUserGroups));
  }
}

function* donorsCollectionsSaga() {
  yield takeLatest(initDonorsList.type, handleFetchDonors);
  yield all([call(handleFetchStatic), call(handleFetchMetadata)]);
}

export function* donorsSaga() {
  yield all([
    donorsCollectionsSaga(),
    takeLatest(initConfig.type, handleFetchConfig)
  ]);
}

export function* currentDonorSaga() {
  yield takeLatest([onRouteChange.type], handleCurrentDonor);
}

function* fetchReportFilterCollections(action) {
  yield all([
    call(handleFetchGrants, action),
    call(handleFetchExternalGrants, action),
    call(maybeFetch, handleFetchOffices, selectOffices)
  ]);
}

function* fetchThematicFilterCollections() {
  yield all([
    call(maybeFetch, handleFetchThemes, selectThemeCollection),
    call(maybeFetch, handleFetchOffices, selectOffices)
  ]);
}

function* fetchGaviReportsFilterCollections() {
  yield all([
    call(maybeFetch, handleFetchGaviReports, selectGavi)
    //call(maybeFetch, handleFetchOffices, selectOffices)
  ]);
}

function* fetchGaviStatementsFilterCollections() {
  yield all([
    call(maybeFetch, handleFetchGaviStatementsReports, selectGavi)
  ]);
}

function* fetchSearchReportFilterCollections(action) {
  yield all([
    call(handleFetchGrants, action),
    call(handleFetchExternalGrants, action),
    call(maybeFetch, handleFetchOffices, selectOffices)
  ]);
}

function* fetchPooledFilterCollections(action) {
  yield all([
    call(handleFetchGrants, action),
    call(handleFetchExternalGrants, action),
    call(maybeFetch, handleFetchOffices, selectOffices)
  ]);
}

export function* filtersSaga() {
  yield takeLatest(initCertifiedReportsPage.type, fetchReportFilterCollections);
  yield takeLatest(initThematicGrantsPage.type, fetchThematicFilterCollections);
  yield takeLatest(initGaviReportsPage.type, fetchGaviReportsFilterCollections);
  yield takeLatest(initGaviStatementsPage.type, fetchGaviStatementsFilterCollections);  
  yield takeLatest(initPooledGrantsPage.type, fetchPooledFilterCollections);
  yield takeLatest(initSearchReportsPage.type, fetchSearchReportFilterCollections);
}

export default function*() {
  yield all([filtersSaga(), donorsSaga(), currentDonorSaga()]);
}
