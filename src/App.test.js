import React from 'react';
import { render } from '@testing-library/react';

import App from './App';

it('mounts the application shell without crashing', () => {
  const { container } = render(<App />);

  expect(container.firstChild).not.toBeNull();
});
