import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import rootReducer from 'slices';
import AppTheme from 'contexts/theme-provider';
import { EmotionCssContextProvider } from 'styles/makeStyles';
import { GAVI_REPORTS, POOLED_GRANTS, SEARCH_REPORTS } from 'lib/constants';
import DonorsList from './index';

const donors = [{ id: 42, name: 'Test Donor', code: 'TD' }];

function donorLinkFor(menuBarPage) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: { donors, ui: { menuBarPage } }
  });

  render(
    <EmotionCssContextProvider>
      <Provider store={store}>
        <AppTheme>
          <MemoryRouter>
            <DonorsList />
          </MemoryRouter>
        </AppTheme>
      </Provider>
    </EmotionCssContextProvider>
  );

  return screen.getByRole('link', { name: 'Test Donor' });
}

test('does not build a Gavi link when the last selected menu item was a Gavi page', () => {
  expect(donorLinkFor(GAVI_REPORTS)).toHaveAttribute('href', `/${SEARCH_REPORTS}/42`);
});

test('keeps the selected DRP report page', () => {
  expect(donorLinkFor(POOLED_GRANTS)).toHaveAttribute('href', `/${POOLED_GRANTS}/42`);
});

test('defaults to reports when no menu item is selected', () => {
  expect(donorLinkFor('')).toHaveAttribute('href', `/${SEARCH_REPORTS}/42`);
});
