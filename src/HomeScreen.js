import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useFonts, Poppins_100Thin, Poppins_700Bold, Poppins_300Light } from '@expo-google-fonts/poppins';
import Spinner from 'react-native-loading-spinner-overlay';

const HomeScreen = () => {
  const [fontLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_700Bold,
    Poppins_300Light
  });
  const checkIpAddress =/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi

  const checkDomain =/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/  

  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState(null);
  const [ipAddress, setIpAddress] = useState('');
  const mapViewRef = useRef(null);

  useEffect(() => {
    const getInitialData = async () => {
      try {
        const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_NQx2PDaX4b236ZPfsKK2dZqCnNERr&ipAddress=5.8.128.1`);
        const data = await res.json();
        setAddress(data);
        console.log(data);
        setLoading(false)
      } catch (error) {
        console.trace(error);
      }
    };

    getInitialData();
  }, []);

  if (!fontLoaded) return null;

  const getEnteredData = async () => {
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_NQx2PDaX4b236ZPfsKK2dZqCnNERr&${
        checkIpAddress.test(ipAddress)
          ? `ipAddress=${ipAddress}`
          : checkDomain.test(ipAddress)
          ? `domain=${ipAddress}`
          : ""
      }`
    )
    const data = await res.json()
    console.log("NEW ---- DATA ----- SET")
    setAddress(data)
    setLoading(false)
    animateToMarker(data);
  }

  const handleSubmit = () => {
    setLoading(true)
    getEnteredData();
    setIpAddress("");
  }

  const animateToMarker = (data) => {
    if (mapViewRef.current) {
      mapViewRef.current.animateToRegion({
        latitude: data.location.lat,
        longitude: data.location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 1000);
    }
  };

  return (
    <View style={styles.main}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: "Poppins_300Light", fontSize: 25 }}>IP address tracker</Text>
        <TextInput 
          value={ipAddress} 
          onChangeText={setIpAddress} 
          placeholder='enter a valid IP or Domain name' 
          style={styles.inp}
        /> 
          <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: "#3498DB", marginTop: 15, padding: 8, borderRadius: 8,marginBottom:10 }}>
          <Text style={{ color: "white" }}>check Now</Text>
        </TouchableOpacity>
      </View>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View>
      {address && 
        <View>
          <View style={{flexDirection:"column", justifyContent:"center",alignItems:"center"}}>
            <View style={{flexDirection:"row"}}>
              <View style={styles.elem}><Text style={styles.inside}>IP ADRESSE</Text><Text style={styles.ress}>{address.ip}</Text></View>
              <View style={styles.elem}><Text style={styles.inside}>LOCATION</Text><Text style={styles.ress}>{address.location.country},{address.location.region}</Text></View>
            </View>
            <View style={{flexDirection:"row"}}>
              <View style={styles.elem}><Text style={styles.inside}>TIME ZONE</Text><Text style={styles.ress}>UTC {address.location.timezone}</Text></View>
              <View style={styles.elem}><Text style={styles.inside}>ISP</Text><Text style={styles.ress}>{address.isp}</Text></View>
            </View>
          </View>
          <View style={styles.mapContainer}>
            <MapView
              ref={mapViewRef}
              style={styles.map}
              initialRegion={{
                latitude: address.location.lat,
                longitude: address.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{ latitude: address.location.lat, longitude:address.location.lng }}
                title="Your Marker Title"
                description="Your Marker Description"
              />
            </MapView>
          </View>
        </View>
      }
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  inp: {
    marginTop: 10,
    borderBottomWidth: 1, // Add bottom border width
    borderBottomColor: 'black', // Set bottom border color
    fontSize: 16,
    width: 240
  },
  mapContainer: {
    paddingHorizontal:20,
    height:380,
    alignItems: 'center',
    marginHorizontal:20,
    borderRadius:15,
    padding:8,
    ...Platform.select({
      ios: {
        shadowColor: '#3498DB',
        shadowOffset: { width: 10, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    })
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius:15,
    marginTop:20,
  },
  elem:{
    flex:1,
    marginHorizontal:7,
    marginVertical:7,
    alignItems:"center",
    height:130,
    borderRadius:15,
    backgroundColor:"#3498DB",
    padding:8,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    })
  },
  inside:{
    fontSize:20,
    fontWeight:"300",
    color:"#4a4a4a"
  },
  ress:{
    marginTop:18,
    fontSize:20,
    fontWeight:"bold"
  }
})
