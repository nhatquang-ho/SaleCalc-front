import React, { createContext, useState, useEffect } from 'react';
import keycloak, { initKeycloak } from './keycloak';
import { useDispatch } from 'react-redux';
import { setUserInfo, clearUserInfo } from '../store/userSlice';

export const KeycloakContext = createContext();

const KeycloakProvider = ({ children }) => {
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    initKeycloak(() => {
      keycloak.loadUserProfile().then(profile => {
        dispatch(setUserInfo(profile));
        setKeycloakInitialized(true);
      }).catch(error => {
        console.error('Failed to load user profile:', error);
        setKeycloakInitialized(true); // Set to true to allow rendering even if profile loading fails
      });
    });
  }, [dispatch]);

  if (!keycloakInitialized) {
    return <div>Loading...</div>; // Show a loading indicator while Keycloak is initializing
  }

  return (
    <KeycloakContext.Provider value={{ keycloak }}>
      {children}
    </KeycloakContext.Provider>
  );
};

export default KeycloakProvider;