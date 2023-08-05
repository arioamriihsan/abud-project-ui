import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import 'config/config';
import { QueryClientProvider } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@app/store/store';
import ReactDOM from 'react-dom';
import React from 'react';
import queryClient from './core/queryClient';
import combineProviders from './context/combineProviders';

interface EventTarget {
  state?: 'activated';
}

const Providers = combineProviders([
  [QueryClientProvider, { client: queryClient }],
  [ReduxProvider, { store }],
]);

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorkerRegistration.register({
  onUpdate: (registration) => {
    const waitingServiceWorker = registration.waiting;

    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener('statechange', (event) => {
        if ((event.target as EventTarget).state === 'activated') window.location.reload();
      });
      waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
    }
  },
}); // app will reload if new version of app is available

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
