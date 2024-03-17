import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/WelcomeScreen';
import HomeScreen from './src/HomeScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='welcome' component={WelcomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name='home' component={HomeScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;
