import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setUser({ isLoggedIn: true, token });
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const signIn = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
      setUser({ isLoggedIn: true, token });
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
