import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from '@expo/vector-icons/Ionicons';
import Icony from 'react-native-vector-icons/FontAwesome';
import Iconq from 'react-native-vector-icons/AntDesign'
const Tab = createBottomTabNavigator();
const { height, width } = Dimensions.get('window');

//Screen
import Home from '../Pages/Home/Home.js';
import History from '../Pages/History/History.js';
import Logout from '../Pages/Logout/Logout.js';


const Bottomtab = () => {
    return (
        <Tab.Navigator

            // tabBarOptions={{
            //     keyboardHidesTabBar: true
            // }}
            screenOptions={{
                "tabBarHideOnKeyboard": true,
                tabBarActiveTintColor: '#fff',
                tabBarShowLabel: true,
                headerShown: false,
                //tabBarInactiveTintColor: COLORS.secondaryFontColor,
                tabBarStyle: {
                    backgroundColor: '#2c2c30',
                    height: 55,
                    paddingBottom: 5,


                },
                // tabStyle: {
                //     paddingVertical: 5,
                //     paddingHorizontal:10,
                //     marginHorizontal:10
                // }


            }}
        >

            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size, }) => {
                        return <Icony
                            name='home'
                            type='AntDesign'
                            color={color}
                            size={18}
                        />

                    },

                    tabBarLabelStyle: {
                        fontWeight:800,
                        fontSize: 13,
                        color:'#61dbfb',
                    },
                }}
            />

            <Tab.Screen
                name="History"
                component={History}
                options={{
                    tabBarIcon: ({ color, size, }) => {

                        return (
                            <Icony
                                name='download'
                                type='AntDesign'
                                color={color}
                                size={18}
                            />
                        )


                    },

                    tabBarLabelStyle: {
                        fontWeight:800,
                        fontSize: 13,
                        color:'#61dbfb',
                    },
                }}
            />

            <Tab.Screen
                name="Logout"
                component={Logout}
                options={{
                    tabBarIcon: ({ color, size, }) => {
                        return <Iconq
                            name='logout'
                            type='AntDesign'
                            color={color}
                            size={18}
                        />

                    },

                    tabBarLabelStyle: {
                        fontWeight:900,
                        fontSize: 13,
                        color:'#61dbfb',
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export default Bottomtab