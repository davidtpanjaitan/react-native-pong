import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/Screen/HomeScreen';
import OtherScreen from './src/Screen/OtherScreen';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'welcome' }}
        />
        <Stack.Screen
          name = "Other"
          component = {OtherScreen}
          options = {{title: 'some impossible mini game'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;
