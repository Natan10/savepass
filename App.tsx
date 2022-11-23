import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  useFonts,
  Rubik_300Light,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold
} from '@expo-google-fonts/rubik';

import Home from './src/screens/Home';

import theme from './src/global/styles/theme';
import { StatusBar } from 'expo-status-bar';

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
      <StatusBar style='light' />
      <Home />
    </ThemeProvider>
  );
}