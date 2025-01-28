import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from 'react-query';
import queryClient from './src/utils/queryClient';
import ProjectListScreen from './src/screens/ProjectListScreen';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <ProjectListScreen />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
