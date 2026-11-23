import React from 'react';
import { render, screen } from '@testing-library/react';
import { Table, TableBody } from '@mui/material';

import AppTheme from 'contexts/theme-provider';
import { EmotionCssContextProvider } from 'styles/makeStyles';
import TableLoadingRow from './table-loading-row';

test('shows a small spinner with the loading label inside the table', () => {
  render(
    <EmotionCssContextProvider>
      <AppTheme>
        <Table>
          <TableBody>
            <TableLoadingRow colSpan={2} label="Loading reports..." />
          </TableBody>
        </Table>
      </AppTheme>
    </EmotionCssContextProvider>
  );

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  expect(screen.getByText('Loading reports...')).toBeInTheDocument();
});
