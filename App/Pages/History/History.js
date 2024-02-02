import {
  StyleSheet, Text, View, Pressable,
  Image, TextInput, ActivityIndicator, Dimensions, FlatList
} from 'react-native'
import React, { useState, useEffect } from 'react';
import { mdscale, vrscale } from '../../PixelRatio';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/FontAwesome';


const History = () => {

  const [events, setEvents] = useState([]);
  console.log('event', events);

  const showHistory = async () => {
    try {
      const url = new URL('https://65bb66d252189914b5bbffbf.mockapi.io/api/location/user');
      // url.searchParams.append('completed', false);
      url.searchParams.append('page', 1);
      url.searchParams.append('limit', 10);

      const response = await fetch(url, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      });

      if (response.ok) {
        const tasks = await response.json();
        // console.log(tasks)
        setEvents(tasks); // Update state with fetched data
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const Item = ({ latitude, longitude }) => (
    <View style={styles.item}>
      <Text style={styles.itemTxt}>Latitude : </Text>
      <Text style={styles.itemTxt}>Longitude :  </Text>
    </View>
  );
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.card}>


        <FlatList
          data={events}
          renderItem={({ item }) =>
            <View style={styles.item}>
              <Text style={styles.itemTxt}>Latitude :{item.latitude} </Text>
              <Text style={styles.itemTxt}>Longitude : {item.longitude} </Text>
              <Text style={styles.itemTxt}>TimeStamp : {item.timestamp} </Text>
            </View>
          }
          keyExtractor={item => item.id}
        />
        {/* <View style={styles.item}>
          <Text style={styles.itemTxt}>Latitude : </Text>
          <Text style={styles.itemTxt}>Longitude :  </Text>
        </View> */}
      </View>
      <Pressable
        onPress={showHistory}
        style={styles.button}>
        <Text style={styles.buttonText}>
          History
        </Text>
      </Pressable>
    </View>
  )
}

export default History

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#191632',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemTxt: {
    color: '#fff'
  },

  card: {
    marginTop: mdscale(50),
    backgroundColor: '#e5c6cb',
    alignSelf: 'center',
    width: mdscale(300),
    height: vrscale(400),
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
    marginTop: mdscale(100),
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