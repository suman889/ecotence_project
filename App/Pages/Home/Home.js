import {
  StyleSheet, Text, View, Pressable,
  Image, TextInput, ActivityIndicator, Dimensions
} from 'react-native'
import React, { useState, useEffect } from 'react';
import { mdscale, vrscale } from '../../PixelRatio';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import { handleTimeStamp } from '../../Utils/dateUtils.js';
import { requestLocationPermission } from '../../Utils/geoLocation.js';
import AuthService from '../../Service/AuthService.js';

// import Geolocation from 'react-native-geolocation-service';

// comunity geoLocation 
import Geolocation from '@react-native-community/geolocation';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';



// import { ref, set } from "@react-native-firebase/database";
import { db } from "../../Service/FirebaseConfig.js";
const BACKGROUND_FETCH_TASK_ID = 'my-location-update-task';


const Home = ({ route }) => {
  // const {uid} = route.params.uid;
  // console.log(uid);
  const [dateTime, setDateTime] = useState({})
  const [email, setEmail] = useState('')
  const [uuid, setUuid] = useState('')
  const [location, setLocation] = useState({});
  const [backgroundLocation, setBackgroundLocation] = useState([]);

  console.log('email====', email)
  // console.log('Locatyop=====', location);
  // console.log('suman===>>>', backgroundLocation);

  useEffect(() => {
    async function getEmail() {
      const user = await AuthService.getAccount()
      // console.log('userEmail====+++', user.user.email, user.user.uid)

      let userEmail = user.user.email
      let userUid = user.user.uid

      if (userEmail && userUid) {
        setEmail(userEmail)
        setUuid(userUid)

      }
    }
    getEmail()
    // startRepeatingMethod();
  }, [])


  // upload the data in fierbase
  let uploadId
  useEffect(() => {
    uploadId = setInterval(() => {
      if (backgroundLocation) {
        fetch('https://65bb66d252189914b5bbffbf.mockapi.io/api/location/user', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          // Send your data in the request body as JSON
          body: JSON.stringify(backgroundLocation)
        }).then(res => {
          if (res.ok) {
            // return res.json();
            console.log('Data set.', res.json())
          }
          // handle error
        }).then(task => {
          // do something with the new task
        }).catch(error => {
          // handle error
        })

      }
    }, 18000)
    // Cleanup function to clear the interval:


  }, [])

  //location update every 1 minit
  let intervalId;

  const startRepeatingMethod = async () => {
    intervalId = setInterval(() => {
      // Call the method you want to execute repeatedly here
      Geolocation.getCurrentPosition(
        (location) => {
          // console.log(location);
          setBackgroundLocation((prevLocations) => [
            ...prevLocations,
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              speed: location.coords.speed,
              timestamp: location.timestamp,
            },
          ]);
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 120000, maximumAge: 120000 }
      );
      console.log('Method called=============================>');
    }, 120000); // 60000 milliseconds = 1 minute
  };



  /// Start tracking events
  const startTracking = async () => {

    try {
      const { date, time } = handleTimeStamp();
      setDateTime({ date, time })
      const result = await requestLocationPermission();
      console.log(result)

      if (result) {
        Geolocation.getCurrentPosition(
          (position) => {
            // console.log(position);
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
        );
      }

      /// this method cal every 1 minit to update the current location 
      startRepeatingMethod();


      // Geolocation.watchPosition(
      //   (location) => {
      //     // Process location data in the background
      //     console.log(location)
      //     // setBackgroundLocation({
      //     //     latitude: location.coords.latitude,
      //     //     longitude: location.coords.longitude,
      //     //     speed: location.coords.speed,
      //     //     timestamp: location.timestamp,
      //     // })
      //     setBackgroundLocation((prevLocations) => [
      //       ...prevLocations,
      //       {
      //         latitude: location.coords.latitude,
      //         longitude: location.coords.longitude,
      //         speed: location.coords.speed,
      //         timestamp: location.timestamp,
      //       },
      //     ]);

      //   },
      //   (error) => {
      //     // Handle errors
      //     console.error(error);
      //   },
      //   {
      //     accuracy: {
      //       android: 'high',
      //       ios: 'best',
      //     },
      //     enableHighAccuracy: true,
      //     interval: 120000, // 1 minute
      //     // fastestInterval: 60000, // 5 seconds
      //     distanceFilter: 100,
      //   }
      // )


    } catch (error) {
      console.log(error);
    }



  }

  const stopTracking = () => {
    clearInterval(intervalId);
    clearInterval(uploadId);
    console.log('Methods stopped.');
    Toast.show('Methods stopped');

  }


  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>


      <View style={styles.card}>

        <View style={styles.iconView}>
          <Icon
            name='user-circle-o'
            type='FontAwesome'
            color='#000'
            size={60}
          />
        </View>

        <View style={{
          marginLeft: mdscale(15), marginTop: mdscale(10),
        }}>
          <Text style={styles.text}>Email : {email}</Text>
          <Text style={styles.text}>Latitude : {location.latitude}</Text>
          <Text style={styles.text}>Longitude : {location.longitude} </Text>
          <Text style={styles.text}>Date : {dateTime.date} </Text>
          <Text style={styles.text}>Time : {dateTime.time}</Text>
        </View>
      </View>

      <View style={{
        marginTop: vrscale(60),
        flexDirection: 'row',
        width: '84%',
        height: 70,
        alignSelf: 'center',
        justifyContent: 'space-between'
      }}>
        <Pressable
          onPress={startTracking}
          style={styles.button}>
          <Text style={styles.buttonText}>
            Start Tracking
          </Text>
        </Pressable>

        <Pressable
          onPress={stopTracking}
          style={styles.button}>
          <Text style={styles.buttonText}>
            Stop Tracking
          </Text>
        </Pressable>
      </View>

    </View>
  )
}

export default Home

const styles = StyleSheet.create({

  iconView: {
    marginLeft: mdscale(10), marginTop: mdscale(10),
    backgroundColor: '#f36054',
    height: 60, width: 60, borderRadius: 30
  },

  card: {
    marginTop: mdscale(50),
    backgroundColor: '#e5c6cb',
    alignSelf: 'center',
    width: mdscale(300),
    height: vrscale(200),
    borderRadius: 10,
  },

  text: {
    color: '#000', fontWeight: "bold",
    marginVertical: 4
  },

  button: {
    height: mdscale(60),
    alignSelf: 'center',
    width: '40%',
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