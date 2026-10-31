import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './components/Routes';
import AppTheme from 'contexts/theme-provider';
import { CssBaseline } from '@mui/material';
import { EmotionCssContextProvider } from 'styles/makeStyles';

function App() {
  return (
    <EmotionCssContextProvider>
      <Provider store={store}>
        <AppTheme>
          <CssBaseline />
          <Routes />
        </AppTheme>
      </Provider>
    </EmotionCssContextProvider>
  );
}

export default App;
