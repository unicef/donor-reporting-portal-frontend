import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, useLocation } from 'react-router-dom';

import rootReducer from 'slices';
import AppTheme from 'contexts/theme-provider';
import { EmotionCssContextProvider } from 'styles/makeStyles';
import { SEARCH_REPORTS } from 'lib/constants';
import ConnectedDrawer from './Drawer';

function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

function renderDrawer() {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      ui: { menuBarPage: SEARCH_REPORTS, page: '', donorId: null, assignedRole: true },
      userProfile: {
        group: { name: 'UNICEF User' },
        is_unicef_user: true,
        is_superuser: false,
        donor: {},
        roles: []
      },
      config: { gavi_donor_code: 'GAVI' }
    }
  });

  render(
    <EmotionCssContextProvider>
      <Provider store={store}>
        <AppTheme>
          <MemoryRouter initialEntries={['/']}>
            <LocationProbe />
            <ConnectedDrawer mobileOpen showDrawer />
          </MemoryRouter>
        </AppTheme>
      </Provider>
    </EmotionCssContextProvider>
  );

  return store;
}

test('returning from Gavi to DRP resets the selected page so donor links stay on reports', () => {
  const store = renderDrawer();

  fireEvent.click(screen.getByRole('button', { name: 'Gavi' }));
  expect(store.getState().ui.menuBarPage).toBe('gavi-reports');
  expect(screen.getByTestId('location')).toHaveTextContent('/gavi');

  fireEvent.click(screen.getByRole('button', { name: 'DRP' }));
  expect(screen.getByTestId('location')).toHaveTextContent('/');
  expect(store.getState().ui.menuBarPage).toBe(SEARCH_REPORTS);
});
