import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: process.env.REACT_APP_KEYCLOAK_URL,
  realm: process.env.REACT_APP_KEYCLOAK_REALM,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
});

export const initKeycloak = (onAuthenticatedCallback) => {
  keycloak.init({ onLoad: 'login-required', checkLoginIframe: false }).then(authenticated => {
    if (authenticated) {
      console.log('User is authenticated');
      onAuthenticatedCallback();
    } else {
      console.log('User is not authenticated');
    }
  }).catch(error => {
    console.error('Failed to initialize Keycloak:', error);
  });
};

export default keycloak;