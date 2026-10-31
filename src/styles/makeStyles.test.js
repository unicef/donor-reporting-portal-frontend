import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';

import theme from './theme';
import { EmotionCssContextProvider, makeStyles } from './makeStyles';

const useStyles = makeStyles(styles => ({
  root: {
    color: styles.palette.primary.main
  }
}));

function Probe() {
  const classes = useStyles();
  return <div data-testid="probe" className={classes.root} />;
}

it('registers the generated class in the shared emotion cache', () => {
  const { getByTestId } = render(
    <EmotionCssContextProvider>
      <ThemeProvider theme={theme}>
        <Probe />
      </ThemeProvider>
    </EmotionCssContextProvider>
  );

  const probe = getByTestId('probe');
  expect(probe.className).toMatch(/^css-/);

  const rules = Array.from(document.styleSheets)
    .flatMap(sheet => Array.from(sheet.cssRules || []))
    .map(rule => rule.cssText)
    .join('');

  expect(rules).toContain(theme.palette.primary.main);
  expect(rules).toContain(probe.className);
});
