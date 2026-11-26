import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootReducer from 'slices';
import { onFetchSearchReports } from 'actions';
import { SEARCH_REPORTS } from 'lib/constants';
import { fetchSearchReports } from 'api/search-index';
import searchSaga from './search-reports';

jest.mock('api/search-index', () => ({
  fetchSearchReports: jest.fn(() => Promise.resolve({ results: [] })),
  fetchSearchGavi: jest.fn(() => Promise.resolve({ results: [] })),
  fetchSearchGaviStatements: jest.fn(() => Promise.resolve({ results: [] }))
}));

test('a search waiting for donor data does not leave the global loader active', () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      ui: { menuBarPage: SEARCH_REPORTS, loading: false, currentlyLoadedDonor: '' },
      donor: '',
      userProfile: { is_unicef_user: true, donor: {}, group: { name: '' } },
      config: {
        source_id: { internal: 'internal', external: 'external', gavi: 'gavi' }
      }
    },
    middleware: getDefault => getDefault().concat(sagaMiddleware)
  });

  sagaMiddleware.run(searchSaga);

  store.dispatch(onFetchSearchReports({}));

  expect(fetchSearchReports).not.toHaveBeenCalled();
  expect(store.getState().ui.loading).toBe(false);
});
