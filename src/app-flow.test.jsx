import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';

import rootReducer from 'slices';
import rootSaga from 'sagas';
import AppTheme from 'contexts/theme-provider';
import { EmotionCssContextProvider } from 'styles/makeStyles';
import Main from 'components/Main';
import ConnectedRouterWatcher from 'components/Connected-Router-Watcher';
import { menuItemSelected } from 'slices/ui';
import { SEARCH_REPORTS, THEMATIC_GRANTS } from 'lib/constants';

jest.mock('api', () => {
  const resolved = value => jest.fn(() => Promise.resolve(value));
  return {
    getUserRoles: resolved([]),
    getUserGroups: resolved([]),
    getUserMOUGroups: resolved([]),
    getUserGaviGroups: resolved([]),
    getDonors: resolved([{ id: 42, name: 'Test Donor', code: 'TD' }]),
    getAdminDonors: resolved([]),
    getGrants: resolved([]),
    getExternalGrants: resolved([]),
    getThemes: resolved([]),
    getGaviReports: resolved([]),
    getGaviStatements: resolved([]),
    getStaticAssets: resolved({}),
    getMetadata: resolved([]),
    getOffices: resolved([]),
    getConfig: resolved({}),
    getUserProfile: resolved({}),
    getReports: resolved([]),
    getUsGovReports: resolved([]),
    getThematicReports: resolved([])
  };
});

jest.mock('api/search-index', () => ({
  fetchSearchReports: jest.fn(() => Promise.resolve({ items: [], total_rows: 0 })),
  fetchSearchGavi: jest.fn(() => Promise.resolve({ items: [], total_rows: 0 })),
  fetchSearchGaviStatements: jest.fn(() => Promise.resolve({ items: [], total_rows: 0 }))
}));

const config = {
  gavi_donor_code: 'GAVI',
  source_id: {
    internal: 'internal',
    external: 'external',
    gavi: 'gavi',
    gavi_soa: 'gavi-soa',
    pool_internal: 'pool-internal',
    pool_external: 'pool-external',
    thematic_internal: 'thematic-internal',
    thematic_external: 'thematic-external'
  },
  tracker: {}
};

function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

// Mirrors the drawer's handleNav: select the menu item, then navigate.
function TestNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          dispatch(menuItemSelected(THEMATIC_GRANTS));
          navigate('/thematic-grants');
        }}
      >
        Go Thematic
      </button>
      <button
        onClick={() => {
          dispatch(menuItemSelected(SEARCH_REPORTS));
          navigate('/');
        }}
      >
        Go Reports
      </button>
    </div>
  );
}

test('Gavi to DRP navigation finishes loading and shows the donor library', async () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      ui: { loading: false, page: 'gavi-reports', donorId: null, menuBarPage: 'gavi-reports', assignedRole: true },
      userProfile: {
        group: { name: 'UNICEF User' },
        is_unicef_user: true,
        is_superuser: false,
        donor: {},
        roles: []
      },
      config,
      donors: [{ id: 42, name: 'Test Donor', code: 'TD' }],
      userGroups: ['group'],
      userGaviGroups: ['gavi-group']
    },
    middleware: getDefault => getDefault().concat(sagaMiddleware)
  });
  sagaMiddleware.run(rootSaga);
  window.history.pushState({}, '', '/gavi-reports');

  render(
    <EmotionCssContextProvider>
      <Provider store={store}>
        <AppTheme>
          <BrowserRouter>
            <ConnectedRouterWatcher>
              <LocationProbe />
              <Main />
            </ConnectedRouterWatcher>
          </BrowserRouter>
        </AppTheme>
      </Provider>
    </EmotionCssContextProvider>
  );

  await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('/gavi-reports'));
  await waitFor(() => expect(screen.getByRole('button', { name: 'Open navigation menu' })).toBeInTheDocument());
  fireEvent.click(screen.getByRole('button', { name: 'Open navigation menu' }));
  await waitFor(() => expect(screen.getByRole('button', { name: 'DRP' })).toBeInTheDocument());
  fireEvent.click(screen.getByRole('button', { name: 'DRP' }));

  await waitFor(() => expect(screen.getByRole('heading', { name: 'Select a donor' })).toBeInTheDocument());
  await waitFor(() => expect(store.getState().ui.loading).toBe(false));
  expect(store.getState().ui.menuBarPage).toBe('reports');
});

test('donor to thematic grants and back to the donor library finishes loading', async () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      ui: {
        // Start with a stale counter to prove a route change clears the overlay.
        loading: [1],
        page: 'donors',
        donorId: null,
        menuBarPage: 'reports',
        assignedRole: true
      },
      userProfile: {
        group: { name: 'UNICEF User' },
        is_unicef_user: true,
        is_superuser: false,
        donor: {},
        roles: [{ id: 1 }]
      },
      config,
      donors: [{ id: 42, name: 'Test Donor', code: 'TD' }],
      userGroups: ['group'],
      userGaviGroups: ['gavi-group']
    },
    middleware: getDefault => getDefault().concat(sagaMiddleware)
  });
  sagaMiddleware.run(rootSaga);
  window.history.pushState({}, '', '/donors');

  render(
    <EmotionCssContextProvider>
      <Provider store={store}>
        <AppTheme>
          <BrowserRouter>
            <ConnectedRouterWatcher>
              <LocationProbe />
              <TestNav />
              <Main />
            </ConnectedRouterWatcher>
          </BrowserRouter>
        </AppTheme>
      </Provider>
    </EmotionCssContextProvider>
  );

  await waitFor(() => expect(screen.getByRole('heading', { name: 'Select a donor' })).toBeInTheDocument());
  await waitFor(() => expect(store.getState().ui.loading).toBe(false));

  // Open a donor's reports.
  fireEvent.click(screen.getByRole('link', { name: 'Test Donor' }));
  await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('/reports/42'));
  await waitFor(() => expect(store.getState().ui.loading).toBe(false));

  // Switch to Thematic Grants from the menu.
  fireEvent.click(screen.getByRole('button', { name: 'Go Thematic' }));
  await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('/thematic-grants'));
  await waitFor(() => expect(store.getState().ui.loading).toBe(false));

  // Return to the donor library from the menu.
  fireEvent.click(screen.getByRole('button', { name: 'Go Reports' }));
  await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('/donors'));
  await waitFor(() => expect(screen.getByRole('heading', { name: 'Select a donor' })).toBeInTheDocument());
  await waitFor(() => expect(store.getState().ui.loading).toBe(false));

  expect(store.getState().ui.menuBarPage).toBe('reports');
});
