import { createRoot } from 'react-dom/client';
import App from './App.js';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from 'redux-persist'
import store from './store/index';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container);
let persistor = persistStore(store);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

reportWebVitals();
