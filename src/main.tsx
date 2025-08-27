import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import '@fontsource-variable/albert-sans/index.css';
import '@fontsource/inria-serif/index.css';
import { Provider } from './components/ui/provider.tsx';

createRoot(
  document.getElementById('root')!
).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>
);
