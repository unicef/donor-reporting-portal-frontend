import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'styles/theme';

const AppTheme = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

AppTheme.propTypes = {
  children: PropTypes.node.isRequired
};
export default AppTheme;
