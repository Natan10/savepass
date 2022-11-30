import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Rubik_300Light,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold
} from '@expo-google-fonts/rubik';

import { Routes } from './src/routes';
import { AuthContextWrapper } from './src/hooks/auth';

import theme from './src/global/styles/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Rubik_300Light,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold
  });

  if(!fontsLoaded) return null;

  return (
    <ThemeProvider theme={theme}>
      <AuthContextWrapper>
        <StatusBar style='light' />
        <Routes />
      </AuthContextWrapper>
    </ThemeProvider>
  );
}