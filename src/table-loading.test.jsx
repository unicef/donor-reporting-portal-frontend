import React from 'react';
import PropTypes from 'prop-types';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter, useNavigate } from 'react-router-dom';

import rootReducer from 'slices';
import rootSaga from 'sagas';
import AppTheme from 'contexts/theme-provider';
import { EmotionCssContextProvider } from 'styles/makeStyles';
import Main from 'components/Main';
import ConnectedRouterWatcher from 'components/Connected-Router-Watcher';
import { menuItemSelected } from 'slices/ui';
import { GAVI_REPORTS, SEARCH_REPORTS, THEMATIC_GRANTS } from 'lib/constants';
import { fetchSearchGavi, fetchSearchReports } from 'api/search-index';

jest.mock('api', () => {
  const resolved = value => jest.fn(() => Promise.resolve(value));
  return {
    getUserRoles: resolved([]), getUserGroups: resolved([]), getUserMOUGroups: resolved([]),
    getUserGaviGroups: resolved([]), getDonors: resolved([{ id: 42, name: 'Test Donor', code: 'TD' }]),
    getAdminDonors: resolved([]), getGrants: resolved([]), getExternalGrants: resolved([]),
    getThemes: resolved([]), getGaviReports: resolved([]), getGaviStatements: resolved([]),
    getStaticAssets: resolved({}), getMetadata: resolved([]), getOffices: resolved([]),
    getConfig: resolved({}), getUserProfile: resolved({}), getReports: resolved([]),
    getUsGovReports: resolved([]), getThematicReports: resolved([])
  };
});

jest.mock('api/search-index', () => ({
  fetchSearchReports: jest.fn(),
  fetchSearchGavi: jest.fn(),
  fetchSearchGaviStatements: jest.fn(() => Promise.resolve({ items: [], total_rows: 0 }))
}));

const config = {
  gavi_donor_code: 'GAVI',
  source_id: {
    internal: 'internal', external: 'external', gavi: 'gavi', gavi_soa: 'gavi-soa',
    pool_internal: 'pool-internal', pool_external: 'pool-external',
    thematic_internal: 'thematic-internal', thematic_external: 'thematic-external'
  },
  tracker: {}
};

// Mirrors the drawer's handleNav: select the menu item, then navigate.
function TestNav({ page, path, label }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        dispatch(menuItemSelected(page));
        navigate(path);
      }}
    >
      {label}
    </button>
  );
}

TestNav.propTypes = {
  page: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  startPath: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

function makeStore(startPage) {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      ui: {
        loading: false, page: startPage, donorId: '42', menuBarPage: startPage,
        assignedRole: true, currentlyLoadedDonor: 'TD'
      },
      userProfile: {
        group: { name: 'UNICEF User' }, is_unicef_user: true, is_superuser: false,
        donor: {}, roles: [{ id: 1 }]
      },
      config,
      donor: { id: 42, code: 'TD' },
      donors: [{ id: 42, name: 'Test Donor', code: 'TD' }],
      userGroups: ['group'],
      userGaviGroups: ['gavi-group']
    },
    middleware: getDefault => getDefault().concat(sagaMiddleware)
  });
  sagaMiddleware.run(rootSaga);
  return store;
}

function renderApp(store, nav) {
  window.history.pushState({}, '', nav.startPath);
  return render(
    <EmotionCssContextProvider>
      <Provider store={store}>
        <AppTheme>
          <BrowserRouter>
            <ConnectedRouterWatcher>
              <TestNav {...nav} />
              <Main />
            </ConnectedRouterWatcher>
          </BrowserRouter>
        </AppTheme>
      </Provider>
    </EmotionCssContextProvider>
  );
}

// A fetch mock whose calls can be held open and released on demand.
function controlledFetch(resolvers) {
  return jest.fn(() => new Promise(resolve => { resolvers.push(resolve); }));
}

describe.each([
  {
    name: 'Thematic Grants',
    nav: { page: THEMATIC_GRANTS, path: '/thematic-grants', startPath: '/reports/42', label: 'Go Thematic' }
  },
  {
    name: 'Gavi',
    nav: { page: GAVI_REPORTS, path: '/gavi-reports', startPath: '/reports/42', label: 'Go Gavi' }
  }
])('table spinner on $name', ({ nav }) => {
  let resolvers;

  beforeEach(() => {
    jest.clearAllMocks();
    resolvers = [];
    const controlled = controlledFetch(resolvers);
    fetchSearchReports.mockImplementation(controlled);
    fetchSearchGavi.mockImplementation(controlled);
  });

  test('shows a spinner in the table while the destination page search is pending', async () => {
    const store = makeStore(SEARCH_REPORTS);
    renderApp(store, nav);

    // Let the starting page's initial fetch finish before navigating, so any
    // spinner we see afterwards belongs to the destination page's fetch.
    await waitFor(() => expect(resolvers.length).toBeGreaterThan(0));
    resolvers.splice(0).forEach(resolve => resolve({ items: [], total_rows: 0 }));
    await waitFor(() => expect(store.getState().ui.loading).toBe(false));

    fireEvent.click(screen.getByRole('button', { name: nav.label }));

    await waitFor(() => expect(resolvers.length).toBeGreaterThan(0));
    await waitFor(() => expect(screen.getByText('Loading reports...')).toBeInTheDocument());
    expect(store.getState().ui.loading).toBeTruthy();

    resolvers.splice(0).forEach(resolve => resolve({ items: [], total_rows: 0 }));

    await waitFor(() => expect(screen.queryByText('Loading reports...')).not.toBeInTheDocument());
    await waitFor(() => expect(store.getState().ui.loading).toBe(false));
  });
});
