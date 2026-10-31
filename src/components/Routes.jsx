import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginAuth from 'components/Login-Auth-Wrapper';
import Main from 'components/Main';
import RouteObserver from 'components/Connected-Router-Watcher';
import LandingPage from 'pages/landing/Page';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/landing" element={<LandingPage />} />
      <Route
        path="*"
        element={
          <LoginAuth>
            <RouteObserver>
              <Main />
            </RouteObserver>
          </LoginAuth>
        }
      />
    </Routes>
  </Router>
);

export default AppRoutes;
