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


function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    // alert("You have entered an invalid email address!")
    return (false)
}

const Login = () => {
    const [alldata, setAlldata] = useState({
        email: "",
        PassWord: "",

    })

    const signIn = async () => {
        if (alldata.email == '') {
            Toast.show('please enter email');
            return
        } if (!ValidateEmail(alldata.email)) {
            Toast.show('please enter valid email');
            return
        } if (alldata.PassWord == '') {
            Toast.show('please enter password');
            return
        }

        if (alldata.PassWord.length < 6) {
            Toast.show('Password should be at least 6 characters');
            return
        }

        auth()
            .signInWithEmailAndPassword(alldata.email, alldata.PassWord)
            .then((userCredential) => {
                console.log(' signed in! Sussessfull',userCredential);
                console.log(userCredential.user);
                const uid = userCredential.user.uid;
                const email = userCredential.user.email;
                console.log('<<<<<<<<>>',uid,email);
                // AuthService.setAccount(userCredential.user.email)
                AuthService.setAccount(userCredential)
                Navigation.navigate('MainStack',{'uid':uid})
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }







    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <Text
                style={{
                    color: '#000',
                    // fontFamily: FONTS.medium, 
                    fontSize: 28,
                    textAlign: 'center',
                    marginTop: 50
                }}
            >Login</Text>

            <Text style={{
                color: '#000',
                // fontSize: mdscale(15),
                marginLeft: 20,
                marginTop: vrscale(50),
            }}>Email address</Text>

            <View style={styles.user_name}>
                <TextInput
                    placeholder="abcd@gmail.com"
                    placeholderTextColor="#c1c1c1"
                    style={{
                        //fontWeight: 'bold',
                        color: "#000000",
                        width: mdscale(200),
                    }}
                    onChangeText={a => setAlldata({ ...alldata, email: a })}
                    value={alldata.email}
                />

            </View>

            {/**password */}
            <Text style={{
                color: '#777E91',
                fontSize: mdscale(15), marginLeft: 20,
                marginTop: vrscale(20),
            }}>Password</Text>

            <View style={styles.user_name}>
                <TextInput
                    placeholder="Password "
                    placeholderTextColor="#c1c1c1"
                    secureTextEntry={true}
                    style={{
                        //fontWeight: 'bold',
                        color: "#000000",
                        width: mdscale(200),
                    }}

                    onChangeText={a => setAlldata({ ...alldata, PassWord: a })}
                    value={alldata.PassWord}
                />

            </View>

            {/**Buttons */}
            <Pressable
                //onPress={() => props.navigation.navigate('Showname_number')}
                onPress={signIn}
                style={styles.button}>
                <Text style={styles.buttonText}>
                    Sign in
                </Text>
            </Pressable>


            <View style={{
                alignSelf: 'center',
                marginTop: '15%'
            }}>
                <Text style={{
                    color: '#ACADAC',
                    fontSize: 12
                }}>Didn’t have an account?
                    <Text
                        onPress={() => Navigation.navigate('SignUp')}

                        style={{
                            color: '#000',
                            fontSize: 14,

                        }}> Sign Up</Text>
                </Text>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({

    user_name: {
        backgroundColor: '#F6F5F8',
        width: mdscale(250),
        width: '90%', alignSelf: 'center',
        marginHorizontal: mdscale(25),
        marginTop: mdscale(20),
        borderRadius: 5,
        height: vrscale(45),
        //elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: mdscale(15),
        //borderWidth: 1,
        //borderColor: '#a2a2a2'
    },

    button: {
        height: mdscale(60),
        alignSelf: 'center',
        width: '90%',
        flexDirection: 'row',
        //marginBottom: 60,
        alignItems: 'center',
        marginTop: mdscale(40),
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