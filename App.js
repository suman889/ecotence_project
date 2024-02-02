import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import NavigationService from './App/Service/Navigation.js';
import AuthStack from './App/Navigation/AuthStack';
import MainStack from './App/Navigation/MainStack';


const App = () => {
  return (
    <NavigationContainer ref={r => NavigationService.setTopLevelNavigator(r)}>
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='AuthLogin' component={AuthStack} />
      <Stack.Screen name='MainStack' component={MainStack} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})