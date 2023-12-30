'use client'
import { createContext, useContext, useState } from 'react';

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [formData, setFormData] = useState({});

  return (
    <AppStateContext.Provider value={{ formData, setFormData }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState deve ser usado dentro de um AppStateProvider');
  }
  return context;
};