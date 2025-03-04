import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import KeycloakProvider from './auth/KeycloakProvider';

const theme = createTheme(); // Create a default theme

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <KeycloakProvider>
          <App />
        </KeycloakProvider>
      </ThemeProvider>
    </Provider>
  // </React.StrictMode>
);