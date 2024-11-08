import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/AuthScreen/LoginScreen';
import SignUpScreen from '../screens/AuthScreen/SignUpScreen';

const Stack = createStackNavigator();
const MainNav = () => {

  return (
    <Stack.Navigator initialRouteName='LoginScreen'>
    <Stack.Screen name="LoginScreen" component={LoginScreen}  options={{ headerShown: false, }}/>
    <Stack.Screen name="SignUpScreen" component={SignUpScreen}  options={{ headerShown: false, }} />
  </Stack.Navigator>
  )
}

export default MainNav