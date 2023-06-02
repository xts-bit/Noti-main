import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from './Profile';
import Home from './Home';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={Home}
        />
        <Stack.Screen
          name="profile"
          component={Profile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;