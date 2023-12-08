import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
      <Stack.Navigator initialRouteName="FirstScreen">
        <Stack.Screen
          name="FirstScreen"
          component={FirstScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SecondScreen"
          component={SecondScreen}
          options={{
            headerShown: false,
            transitionSpec: {
              open: { animation: 'timing', config: { duration: 0 } }, // No animation on open
              close: { animation: 'timing', config: { duration: 0 } }, // No animation on close
            },
          }}
        />
      </Stack.Navigator>
  );
};

export default App;

