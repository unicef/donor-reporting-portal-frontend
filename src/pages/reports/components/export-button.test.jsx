import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import rootReducer from 'slices';
import ExportButton from './export-button';

const sourceConfig = { source_id: { internal: 'source-id' } };

function renderExportButton({ totalRows, reports = [] } = {}) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      config: sourceConfig,
      reports,
      searchReports: typeof totalRows === 'number' ? { items: [], total_rows: totalRows } : {}
    }
  });

  render(
    <Provider store={store}>
      <ExportButton />
    </Provider>
  );

  return screen.getByRole('button', { name: /export/i });
}

async function showTooltip(button) {
  fireEvent.mouseOver(button);
  return screen.findByRole('tooltip');
}

test('enables export and explains the limit when there are fewer than 250 search results', async () => {
  const button = renderExportButton({ totalRows: 249 });

  expect(button).toBeEnabled();
  expect(await showTooltip(button)).toHaveTextContent(/fewer than 250 documents/i);
  expect(screen.getByRole('tooltip')).toHaveTextContent(/add or refine filters/i);
});

test('disables export and explains how to reduce results when there are 250 or more search results', async () => {
  const button = renderExportButton({ totalRows: 250 });

  expect(button).toBeDisabled();
  const tooltip = await showTooltip(button);
  expect(tooltip).toHaveTextContent(/250 documents in the current results/i);
  expect(tooltip).toHaveTextContent(/add or refine filters/i);
});

test('uses the reports count when no search result total is available', () => {
  expect(renderExportButton({ reports: new Array(249) })).toBeEnabled();
});

test('disables export when the reports count reaches 250', () => {
  expect(renderExportButton({ reports: new Array(250) })).toBeDisabled();
});
