import {
    StyleSheet, Text, View, Pressable,
    Image, TextInput, ActivityIndicator, Dimensions
} from 'react-native'
import React, { useState } from 'react';
import { mdscale, vrscale } from '../../PixelRatio'
import Toast from 'react-native-simple-toast';
import auth from '@react-native-firebase/auth';

import Navigation from '../../Service/Navigation.js';
import AuthService from '../../Service/AuthService.js';
const Logout = () => {

    const logOut = () => {
        AuthService.Logout();
        Toast.show('Logout Successfully');

        Navigation.navigate('Login')
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Text
                style={{
                    color: '#000',
                    // fontFamily: FONTS.medium, 
                    fontSize: 28,
                    textAlign: 'center',
                    marginTop: vrscale(100)
                }}
            >Log Out</Text>

            <Pressable
                //onPress={() => props.navigation.navigate('Showname_number')}
                onPress={logOut}
                style={styles.button}>
                <Text style={styles.buttonText}>
                    Logout
                </Text>
            </Pressable>
        </View>
    )
}

export default Logout

const styles = StyleSheet.create({

    button: {
        height: mdscale(60),
        alignSelf: 'center',
        width: '90%',
        flexDirection: 'row',
        //marginBottom: 60,
        alignItems: 'center',
        marginTop: mdscale(200),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#191632',
        borderRadius: 10,
    },

    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 15
    }
})