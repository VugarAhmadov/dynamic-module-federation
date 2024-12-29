import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app';

import '@mantine/core/styles.css';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
