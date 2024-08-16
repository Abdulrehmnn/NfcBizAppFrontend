// App.js
import React from 'react';
import Navigation from './src/Navigaion';
import { AuthProvider } from './src/Context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
};

export default App;
