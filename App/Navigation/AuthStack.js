import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Pages/Auth/Login';
import SignUp from '../Pages/Auth/SignUp';




const Stack = createNativeStackNavigator();
const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            gestureDirection: 'horizontal',
        }}>
            {/* <Stack.Screen name="dashboardHome" component={NavigationDrawer} /> */}
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />



        </Stack.Navigator>
    )
}

export default AuthStack

const styles = StyleSheet.create({})