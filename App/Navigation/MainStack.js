import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Pages/Home/Home.js';
import Bottomtab from './BottomTab.js';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Bottomtab" screenOptions={{
      headerShown: false,
      gestureEnabled: false,
      gestureDirection: 'horizontal',
    }}>
      {/* <Stack.Screen name="dashboardHome" component={NavigationDrawer} /> */}
      <Stack.Screen name="Bottomtab" component={Bottomtab} />
      <Stack.Screen name="Home" component={Home} />
     



    </Stack.Navigator>
  )
}

export default MainStack

const styles = StyleSheet.create({})