import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProjectListScreen from '../screens/ProjectListScreen';
import ProjectDetailsScreen from '../screens/ProjectDetailsScreen';
import CreateTaskScreen from '../screens/CreateTaskScreen';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Projects" component={ProjectListScreen} />
      <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} />
      <Stack.Screen name="CreateTask" component={CreateTaskScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
