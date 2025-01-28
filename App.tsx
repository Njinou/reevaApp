import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from 'react-query';
import queryClient from './src/utils/queryClient';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator /> 
      </NavigationContainer>
    </QueryClientProvider>
  );
}
