import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';

import rootReducer from 'slices';
import AppTheme from 'contexts/theme-provider';
import { EmotionCssContextProvider } from 'styles/makeStyles';
import { GAVI_REPORTS, SEARCH_REPORTS } from 'lib/constants';
import ConnectedDrawer from './Drawer';
import ConnectedRouterWatcher from './Connected-Router-Watcher';

function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

function renderApp({ initialPath, menuBarPage }) {
  const actions = [];
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      ui: {
        menuBarPage,
        page: initialPath.split('/').filter(Boolean)[0] || '',
        donorId: null,
        assignedRole: true
      },
      userProfile: {
        group: { name: 'UNICEF User' },
        is_unicef_user: true,
        is_superuser: false,
        donor: {},
        roles: []
      },
      config: { gavi_donor_code: 'GAVI', source_id: { internal: 'internal' }, tracker: {} },
      donors: [{ id: 1, name: 'Test Donor', code: 'TD' }],
      userGroups: ['group'],
      userGaviGroups: ['gavi-group']
    },
    middleware: getDefault =>
      getDefault().concat(() => next => action => {
        actions.push(action.type);
        return next(action);
      })
  });

  render(
    <EmotionCssContextProvider>
      <Provider store={store}>
        <AppTheme>
          <MemoryRouter initialEntries={[initialPath]}>
            <ConnectedRouterWatcher>
              <LocationProbe />
              <ConnectedDrawer mobileOpen showDrawer />
              <Routes>
                <Route path="/" element={<Navigate to="/donors" replace />} />
                <Route path="/donors" element={<div>Donor library</div>} />
                <Route path="/gavi" element={<Navigate to="/gavi-reports" replace />} />
                <Route path="/gavi-reports" element={<div>Gavi report page</div>} />
              </Routes>
            </ConnectedRouterWatcher>
          </MemoryRouter>
        </AppTheme>
      </Provider>
    </EmotionCssContextProvider>
  );

  return {
    store,
    actions,
    navigationActions: () =>
      actions.filter(type => type === 'ui/onRouteChange' || type === 'ui/menuItemSelected')
  };
}

test('returning from Gavi to DRP resets the selected page after the route changes', async () => {
  const { store, navigationActions } = renderApp({
    initialPath: '/gavi-reports',
    menuBarPage: GAVI_REPORTS
  });

  const actionsBeforeClick = navigationActions().length;
  fireEvent.click(screen.getByRole('button', { name: 'DRP' }));

  await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('/donors'));
  expect(store.getState().ui.menuBarPage).toBe(SEARCH_REPORTS);
  expect(navigationActions().slice(actionsBeforeClick)).toEqual([
    'ui/onRouteChange',
    'ui/menuItemSelected'
  ]);
});

test('opening Gavi from DRP navigates through the route to Gavi Reports', async () => {
  const { store } = renderApp({
    initialPath: '/donors',
    menuBarPage: SEARCH_REPORTS
  });

  fireEvent.click(screen.getByRole('button', { name: 'Gavi' }));

  await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('/gavi-reports'));
  expect(store.getState().ui.menuBarPage).toBe(GAVI_REPORTS);
});
